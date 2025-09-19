import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertTemporaryEmailSchema, insertMessageSchema } from "@shared/schema";

// Mail.tm API configuration
const MAIL_TM_BASE_URL = "https://api.mail.tm";

// Types for Mail.tm API responses
interface MailTmDomainResponse {
  "@id": string;
  "@type": string;
  id: string;
  domain: string;
}

interface MailTmAccountResponse {
  "@id": string;
  id: string;
  address: string;
  quota: number;
  used: number;
  isDisabled: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface MailTmTokenResponse {
  token: string;
}

interface MailTmMessageResponse {
  "@id": string;
  id: string;
  from: {
    address: string;
    name: string;
  };
  to: Array<{
    address: string;
    name: string;
  }>;
  subject: string;
  intro: string;
  text: string;
  html: Array<string>;
  hasAttachments: boolean;
  attachments: Array<any>;
  size: number;
  downloadUrl: string;
  createdAt: string;
  updatedAt: string;
}

// Helper functions for Mail.tm API
async function fetchMailTmDomains(): Promise<MailTmDomainResponse[]> {
  try {
    const response = await fetch(`${MAIL_TM_BASE_URL}/domains`);
    if (!response.ok) {
      throw new Error(`Failed to fetch domains: ${response.status}`);
    }
    const data = await response.json();
    return data["hydra:member"] || [];
  } catch (error) {
    console.error("Error fetching Mail.tm domains:", error);
    // Return fallback domains
    return [
      { "@id": "/domains/1", "@type": "Domain", id: "1", domain: "1secmail.com" },
      { "@id": "/domains/2", "@type": "Domain", id: "2", domain: "mail.tm" }
    ];
  }
}

async function createMailTmAccount(address: string, password: string): Promise<MailTmAccountResponse | null> {
  try {
    const response = await fetch(`${MAIL_TM_BASE_URL}/accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create account: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating Mail.tm account:", error);
    return null;
  }
}

async function getMailTmToken(address: string, password: string): Promise<string | null> {
  try {
    const response = await fetch(`${MAIL_TM_BASE_URL}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to get token: ${response.status}`);
    }

    const data: MailTmTokenResponse = await response.json();
    return data.token;
  } catch (error) {
    console.error("Error getting Mail.tm token:", error);
    return null;
  }
}

async function fetchMailTmMessages(token: string): Promise<MailTmMessageResponse[]> {
  try {
    const response = await fetch(`${MAIL_TM_BASE_URL}/messages`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch messages: ${response.status}`);
    }

    const data = await response.json();
    return data["hydra:member"] || [];
  } catch (error) {
    console.error("Error fetching Mail.tm messages:", error);
    return [];
  }
}

// Generate random string for email prefix
function generateRandomString(length: number = 10): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Initialize domains in database
  async function initializeDomains() {
  try {
    const existingDomains = await storage.getActiveDomains();

    // Force powerscrews.com into DB
    const hasMainDomain = existingDomains.some(d => d.domain === "powerscrews.com");
    if (!hasMainDomain) {
      await storage.createDomain({
        domain: "powerscrews.com",
        isActive: true,
      });
    }

    // (Optional) also fetch Mail.tm domains for fallback
    if (existingDomains.length === 0) {
      const mailTmDomains = await fetchMailTmDomains();
      for (const domain of mailTmDomains) {
        await storage.createDomain({
          domain: domain.domain,
          isActive: true,
        });
      }
    }
  } catch (error) {
    console.error("Error initializing domains:", error);
  }
}

  await initializeDomains();

  // Start cleanup interval
  setInterval(async () => {
    try {
      await storage.cleanupExpiredEmails();
    } catch (error) {
      console.error("Error during cleanup:", error);
    }
  }, 60000); // Cleanup every minute

  // Get available domains
  app.get("/api/domains", async (req, res) => {
    try {
      const domains = await storage.getActiveDomains();
      res.json(domains);
    } catch (error) {
      console.error("Error fetching domains:", error);
      res.status(500).json({ error: "Failed to fetch domains" });
    }
  });

  // Generate temporary email
  app.post("/api/generate", async (req, res) => {
    try {
      const { domain } = req.body;
      
      // Get available domains if none specified
      const domains = await storage.getActiveDomains();
      const selectedDomain = domain || (domains.length > 0 ? domains[0].domain : "fastmail.tech");
      
      // Generate random email prefix
      const emailPrefix = generateRandomString(12);
      
      // For display: use selected domain
      const displayEmailAddress = `${emailPrefix}@${selectedDomain}`;
      
      // For Mail.tm API: always use powerscrews.com (the only working domain)
      const actualEmailAddress = `${emailPrefix}@powerscrews.com`;
      
      // Set expiration time to 10 minutes from now
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
      
      // Generate password for Mail.tm account
      const password = generateRandomString(16);
      
      let mailTmToken = null;
      let mailTmId = null;
      
      // Try to create Mail.tm account (always use powerscrews.com)
      const mailTmAccount = await createMailTmAccount(actualEmailAddress, password);
      if (mailTmAccount) {
        mailTmId = mailTmAccount.id;
        mailTmToken = await getMailTmToken(actualEmailAddress, password);
      }
      
      // Save to database (use display email for user, but track actual email for API)
      const temporaryEmail = await storage.createTemporaryEmail({
        email: displayEmailAddress, // What user sees
        domain: selectedDomain,
        mailTmToken,
        mailTmId,
        expiresAt,
        isActive: true,
        actualEmail: actualEmailAddress, // What actually receives emails
      });
      
      res.json(temporaryEmail);
    } catch (error) {
      console.error("Error generating email:", error);
      res.status(500).json({ error: "Failed to generate email" });
    }
  });

  // Get messages for an email
  app.get("/api/messages/:email", async (req, res) => {
    try {
      const { email } = req.params;
      
      // Get email from database
      const temporaryEmail = await storage.getTemporaryEmail(email);
      if (!temporaryEmail || !temporaryEmail.isActive) {
        return res.status(404).json({ error: "Email not found or expired" });
      }
      
      // Fetch new messages from Mail.tm if we have a token
      if (temporaryEmail.mailTmToken) {
        try {
          const mailTmMessages = await fetchMailTmMessages(temporaryEmail.mailTmToken);
          
          // Store new messages in database
          for (const message of mailTmMessages) {
            // Check if message already exists
            const existingMessages = await storage.getMessagesByEmail(temporaryEmail.id);
            const messageExists = existingMessages.some(m => m.mailTmMessageId === message.id);
            
            if (!messageExists) {
              await storage.createMessage({
                emailId: temporaryEmail.id,
                mailTmMessageId: message.id,
                sender: message.from.address,
                subject: message.subject,
                body: message.text || message.intro || "",
                isRead: false,
              });
            }
          }
        } catch (error) {
          console.error("Error fetching Mail.tm messages:", error);
        }
      }
      
      // Get all messages from database
      const messages = await storage.getMessagesByEmail(temporaryEmail.id);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // Mark message as read
  app.post("/api/messages/:messageId/read", async (req, res) => {
    try {
      const { messageId } = req.params;
      await storage.markMessageAsRead(messageId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking message as read:", error);
      res.status(500).json({ error: "Failed to mark message as read" });
    }
  });

  // Get email status and time remaining
  app.get("/api/email/:email/status", async (req, res) => {
    try {
      const { email } = req.params;
      const temporaryEmail = await storage.getTemporaryEmail(email);
      
      if (!temporaryEmail) {
        return res.status(404).json({ error: "Email not found" });
      }
      
      const now = new Date();
      const timeRemaining = Math.max(0, temporaryEmail.expiresAt.getTime() - now.getTime());
      
      res.json({
        email: temporaryEmail.email,
        isActive: temporaryEmail.isActive && timeRemaining > 0,
        expiresAt: temporaryEmail.expiresAt,
        timeRemaining,
      });
    } catch (error) {
      console.error("Error getting email status:", error);
      res.status(500).json({ error: "Failed to get email status" });
    }
  });

  // Manual cleanup endpoint
  app.post("/api/cleanup", async (req, res) => {
    try {
      await storage.cleanupExpiredEmails();
      res.json({ success: true });
    } catch (error) {
      console.error("Error during cleanup:", error);
      res.status(500).json({ error: "Failed to cleanup expired emails" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}