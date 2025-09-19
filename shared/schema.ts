import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Temporary emails table
export const temporaryEmails = pgTable("temporary_emails", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  domain: text("domain").notNull(),
  actualEmail: text("actual_email"), // The real email used for Mail.tm API
  mailTmToken: text("mail_tm_token"), // Token from Mail.tm API
  mailTmId: text("mail_tm_id"), // ID from Mail.tm API
  expiresAt: timestamp("expires_at").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Messages table
export const messages = pgTable("messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  emailId: varchar("email_id").notNull(),
  mailTmMessageId: text("mail_tm_message_id"), // ID from Mail.tm API
  sender: text("sender").notNull(),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  isRead: boolean("is_read").default(false),
  receivedAt: timestamp("received_at").defaultNow(),
});

// Available domains table
export const domains = pgTable("domains", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  domain: text("domain").notNull().unique(),
  isActive: boolean("is_active").default(true),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const temporaryEmailsRelations = relations(temporaryEmails, ({ many }) => ({
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  email: one(temporaryEmails, {
    fields: [messages.emailId],
    references: [temporaryEmails.id],
  }),
}));

// Insert schemas
export const insertTemporaryEmailSchema = createInsertSchema(temporaryEmails).omit({
  id: true,
  createdAt: true,
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  receivedAt: true,
});

export const insertDomainSchema = createInsertSchema(domains).omit({
  id: true,
  updatedAt: true,
});

// Types
export type TemporaryEmail = typeof temporaryEmails.$inferSelect;
export type InsertTemporaryEmail = z.infer<typeof insertTemporaryEmailSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Domain = typeof domains.$inferSelect;
export type InsertDomain = z.infer<typeof insertDomainSchema>;
