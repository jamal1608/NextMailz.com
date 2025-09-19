import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, Database, Eye, Lock, Trash2 } from "lucide-react";

export default function Privacy() {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: {
        subtitle: "Temporary Email Data",
        description: "We temporarily store only the essential data needed to provide our email service. This includes:",
        items: [
          "Temporary email addresses and their expiration times",
          "Email content and attachments received at temporary addresses", 
          "Sender information and delivery timestamps",
          "Message read/unread status for user interface purposes"
        ]
      }
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: {
        items: [
          "Service Delivery: To provide temporary email functionality and display received messages in your inbox",
          "Service Improvement: To maintain optimal performance, reliability, and user experience",
          "Security Protection: To prevent abuse, spam, malicious activities, and unauthorized access",
          "Technical Operations: To ensure proper email routing, delivery, and automatic cleanup processes"
        ]
      }
    },
    {
      icon: Clock,
      title: "Data Retention & Automatic Deletion",
      content: {
        description: "All temporary emails and associated data are automatically deleted after exactly 10 minutes. This includes:",
        items: [
          "• Complete removal of email addresses from our systems",
          "• Permanent deletion of all received messages and attachments",
          "• Automatic cleanup of any associated metadata or logs",
          "• No backup copies or archives are maintained beyond the 10-minute window"
        ]
      }
    },
    {
      icon: Lock,
      title: "Information Sharing & Third Parties", 
      content: {
        description: "We maintain strict privacy standards regarding your data:",
        items: [
          "• We never sell, trade, or share your temporary email data with third parties",
          "• Email content remains completely private and accessible only during your active session",
          "• We do not use your data for advertising, marketing, or profiling purposes",
          "• Third-party integrations (like Mail.tm) operate under their own privacy policies"
        ]
      }
    },
    {
      icon: Shield,
      title: "Security Measures",
      content: {
        description: "We implement multiple layers of security to protect your privacy:",
        items: [
          "End-to-End Encryption: All data transmission uses HTTPS/TLS encryption",
          "Secure Infrastructure: Our servers are protected with enterprise-grade security controls",
          "Access Controls: Strict authentication and authorization protocols limit system access",
          "Regular Security Audits: Continuous monitoring and vulnerability assessments",
          "Zero-Knowledge Architecture: Our systems are designed to minimize data exposure"
        ]
      }
    },
    {
      icon: Trash2,
      title: "Your Privacy Rights",
      content: {
        description: "You have complete control over your temporary email data:",
        items: [
          "• Immediate Access: View all messages received during your session",
          "• Instant Deletion: Manually delete your temporary email address at any time", 
          "• Automatic Expiry: All data is automatically purged after 10 minutes",
          "• No Tracking: We don't create profiles or track your usage patterns",
          "• Anonymous Usage: No registration or personal information required"
        ]
      }
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary w-12 h-12 rounded-xl flex items-center justify-center">
              <Shield className="text-primary-foreground w-6 h-6" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6" data-testid="text-privacy-title">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your privacy is our foundation. Learn how we protect your data and respect your digital rights.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Policy Overview */}
        <Card className="border border-border mb-12" data-testid="card-privacy-intro">
          <CardContent className="p-8">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Last Updated: <span data-testid="text-last-updated" className="text-primary">September 09, 2025</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-privacy-description">
                  This Privacy Policy describes how NextMailz ("we," "our," or "us") collects, uses, protects, and handles your information when you use our temporary email service. We are committed to maintaining the highest standards of privacy and data protection.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Principles */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center border border-border">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Auto-Delete</h4>
              <p className="text-sm text-muted-foreground">All data automatically deleted after 10 minutes</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border border-border">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">No Tracking</h4>
              <p className="text-sm text-muted-foreground">We don't track users or create profiles</p>
            </CardContent>
          </Card>
          
          <Card className="text-center border border-border">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Encrypted</h4>
              <p className="text-sm text-muted-foreground">All communications use HTTPS encryption</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <section key={index}>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center">
                  <section.icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground" data-testid={`text-section-title-${index}`}>
                  {section.title}
                </h2>
              </div>
              
              <Card className="border border-border" data-testid={`card-section-${index}`}>
                <CardContent className="p-8">
                  {section.content.subtitle && (
                    <h3 className="text-lg font-semibold text-foreground mb-4" data-testid={`text-subtitle-${index}`}>
                      {section.content.subtitle}
                    </h3>
                  )}
                  {section.content.description && (
                    <p className="text-muted-foreground mb-4 leading-relaxed" data-testid={`text-description-${index}`}>
                      {section.content.description}
                    </p>
                  )}
                  {section.content.items && (
                    <ul className={`text-muted-foreground space-y-2 ${section.title === "Your Privacy Rights" || section.title === "Data Retention & Automatic Deletion" || section.title === "Information Sharing & Third Parties" ? "" : "list-disc list-inside"}`} data-testid={`list-items-${index}`}>
                      {section.content.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="leading-relaxed" data-testid={`list-item-${index}-${itemIndex}`}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </section>
          ))}
        </div>

        {/* Contact Section */}
        <section className="mt-12">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground" data-testid="text-contact-title">
              Contact Information
            </h2>
          </div>
          
          <Card className="border border-border" data-testid="card-contact">
            <CardContent className="p-8">
              <p className="text-muted-foreground mb-6 leading-relaxed" data-testid="text-contact-description">
                If you have questions about this Privacy Policy, our data practices, or wish to exercise your privacy rights, please contact us using the information below. We are committed to addressing your privacy concerns promptly and transparently.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Privacy Inquiries</h4>
                  <p className="text-muted-foreground" data-testid="text-contact-email">
                    <strong>Email:</strong> <span className="text-primary">privacy@nextmailz.com</span>
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Response Time</h4>
                  <p className="text-muted-foreground">
                    We respond to privacy inquiries within <strong>24 hours</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Last Updated Notice */}
        <div className="mt-8 p-4 bg-muted/30 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">
            This policy is effective as of September 09, 2025. We may update this policy periodically. 
            Any changes will be posted on this page with an updated revision date.
          </p>
        </div>
      </div>
    </div>
  );
}