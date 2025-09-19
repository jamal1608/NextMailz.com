import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";
import { eq, desc, and, lte } from "drizzle-orm";
import { sql } from "drizzle-orm";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });

export interface IStorage {
  // Temporary email operations
  createTemporaryEmail(data: schema.InsertTemporaryEmail): Promise<schema.TemporaryEmail>;
  getTemporaryEmail(email: string): Promise<schema.TemporaryEmail | undefined>;
  getActiveTemporaryEmails(): Promise<schema.TemporaryEmail[]>;
  deactivateTemporaryEmail(id: string): Promise<void>;
  
  // Message operations
  createMessage(data: schema.InsertMessage): Promise<schema.Message>;
  getMessagesByEmail(emailId: string): Promise<schema.Message[]>;
  markMessageAsRead(messageId: string): Promise<void>;
  
  // Domain operations
  createDomain(data: schema.InsertDomain): Promise<schema.Domain>;
  getActiveDomains(): Promise<schema.Domain[]>;
  
  // Cleanup operations
  cleanupExpiredEmails(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async createTemporaryEmail(data: schema.InsertTemporaryEmail): Promise<schema.TemporaryEmail> {
    const [email] = await db
      .insert(schema.temporaryEmails)
      .values(data)
      .returning();
    return email;
  }

  async getTemporaryEmail(email: string): Promise<schema.TemporaryEmail | undefined> {
    const [result] = await db
      .select()
      .from(schema.temporaryEmails)
      .where(eq(schema.temporaryEmails.email, email));
    return result;
  }

  async getActiveTemporaryEmails(): Promise<schema.TemporaryEmail[]> {
    return await db
      .select()
      .from(schema.temporaryEmails)
      .where(eq(schema.temporaryEmails.isActive, true));
  }

  async deactivateTemporaryEmail(id: string): Promise<void> {
    await db
      .update(schema.temporaryEmails)
      .set({ isActive: false })
      .where(eq(schema.temporaryEmails.id, id));
  }

  async createMessage(data: schema.InsertMessage): Promise<schema.Message> {
    const [message] = await db
      .insert(schema.messages)
      .values(data)
      .returning();
    return message;
  }

  async getMessagesByEmail(emailId: string): Promise<schema.Message[]> {
    return await db
      .select()
      .from(schema.messages)
      .where(eq(schema.messages.emailId, emailId))
      .orderBy(desc(schema.messages.receivedAt));
  }

  async markMessageAsRead(messageId: string): Promise<void> {
    await db
      .update(schema.messages)
      .set({ isRead: true })
      .where(eq(schema.messages.id, messageId));
  }

  async createDomain(data: schema.InsertDomain): Promise<schema.Domain> {
    const [domain] = await db
      .insert(schema.domains)
      .values(data)
      .returning();
    return domain;
  }

  async getActiveDomains(): Promise<schema.Domain[]> {
    return await db
      .select()
      .from(schema.domains)
      .where(eq(schema.domains.isActive, true));
  }

  async cleanupExpiredEmails(): Promise<void> {
    // Delete messages for expired emails first
    await db
      .delete(schema.messages)
      .where(
        sql`${schema.messages.emailId} IN (
          SELECT id FROM ${schema.temporaryEmails} 
          WHERE ${schema.temporaryEmails.expiresAt} <= NOW()
        )`
      );
    
    // Then delete expired emails
    await db
      .delete(schema.temporaryEmails)
      .where(lte(schema.temporaryEmails.expiresAt, new Date()));
  }
}

export const storage = new DatabaseStorage();