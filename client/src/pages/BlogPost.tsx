import React, { useEffect } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string; // markdown-like text
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
  trending?: boolean;
  views?: number;
  images?: string[]; // [hero (16:9), inline1, inline2, inline3]
  faqs?: { question: string; answer: string }[];
}

// ---------------------------
// Your blog posts data (kept from your original data).
// You can add `images: [...]` and `faqs: [...]` per post if you want.
// For brevity I include the posts as you provided them — add images/faqs where desired.
// ---------------------------
const blogPostsData: Record<string, BlogPost> = {
  "featured-1": {
    id: "featured-1",
    title: "Best Ways to Protect Your Email from Spam in 2025",
    excerpt: "Discover comprehensive strategies to protect your email privacy with temporary addresses, encryption, and advanced security practices.",
    content: `# Best Ways to Protect Your Email from Spam in 2025

Email remains one of the most important tools for communication, whether for work, online shopping, or social media sign-ups. But in 2025, spam is more aggressive than ever. Phishing attacks, unwanted promotions, and suspicious links can fill your inbox, waste your time, and even put your privacy at risk.

The good news? You don’t have to live with endless spam. With the right tools and habits, you can keep your inbox clean and secure. In this article, we’ll explore the best ways to protect your email from spam in 2025.

1. Use a Temporary Email Address for Risky Sign-Ups

Many websites require you to register before showing content, offering downloads, or giving access to free trials. Unfortunately, these sites often sell or share your email with third parties.

A temporary email address (also called temp mail or disposable email) is the perfect solution. It allows you to:

Keep your real inbox private.

Avoid marketing spam.

Receive verification codes instantly.

Delete the email address after use.

👉 For example, services like NextMailz provide instant, free, and private email addresses that work with real-time delivery. This is one of the most effective ways to stop spam before it starts.

2. Never Share Your Primary Email Publicly

Spammers use bots that scan the internet for publicly visible email addresses. If your real email appears on a forum, social media profile, or website, it’s likely to become a spam magnet.

✅ Best practice:

Use a contact form instead of displaying your email on websites.

Create a secondary email just for public use.

Rely on temporary email for one-time communication.

3. Enable Advanced Spam Filters

Modern email providers like Gmail, Outlook, and Proton Mail include strong spam filters. But in 2025, hackers have become smarter — some spam emails look almost identical to legitimate ones.

Make sure to:

Regularly mark suspicious emails as spam (it trains your provider’s filter).

Block domains or senders that repeatedly send junk mail.

Use third-party tools (like Clean Email or SpamTitan) for stronger filtering.

4. Watch Out for Phishing Emails

Spam isn’t just annoying — it can be dangerous. Phishing emails trick users into clicking fake links or entering login credentials. In 2025, AI-generated phishing emails look very realistic, often copying the design of real companies.

⚠️ Tips to stay safe:

Always check the sender’s domain name (example: support@amaz0n.com
 is fake).

Hover over links before clicking.

Don’t download unexpected attachments.

Enable two-factor authentication (2FA) for all important accounts.

5. Unsubscribe the Smart Way

Not all spam comes from hackers — sometimes it’s just companies sending too many promotions. If the sender is legitimate, use the unsubscribe link at the bottom of the email.

🚫 But be careful: Clicking “unsubscribe” in a suspicious-looking email might confirm to spammers that your address is active. In such cases, mark it as spam instead.

6. Use Aliases or Secondary Emails

Some email providers (like Gmail) let you create aliases. For example, if your email is johnsmith@gmail.com
, you can use johnsmith+shopping@gmail.com
 for online purchases. All emails will still arrive in your inbox, but you’ll know exactly which site leaked your email.

If you see too much spam through one alias, you can filter or block it without affecting your main email.

7. Rely on Privacy-Friendly Email Services

Big free email services scan your data for ads. In 2025, more people are switching to privacy-first email providers like Proton Mail, Tutanota, or Fastmail. These platforms:

Provide end-to-end encryption.

Don’t track your personal data.

Include strong spam protection by default.

For daily use, pair one of these providers with temporary email for sign-ups. That way, your main inbox remains clean.

8. Regularly Clean Your Subscriptions

Over time, people sign up for dozens of newsletters they no longer read. This clutter makes it harder to spot real spam. Use tools like Unroll.Me or Gmail’s built-in subscription manager to:

See all your active subscriptions.

Unsubscribe from unnecessary ones.

Keep only what matters.

9. Keep Software Updated

Many spam emails carry malicious links that exploit old security flaws in browsers or email clients. Always update your:

Email app

Browser

Antivirus software

This ensures you’re protected from the latest threats.

Final Thoughts

Spam isn’t going away anytime soon — in fact, it’s evolving. But with smart habits, temporary email addresses, and modern filters, you can protect your inbox from clutter and keep your personal information safe.

👉 If you value privacy and want a clean inbox, try using a temporary email service like NextMailz. It’s free, fast, and secure — and it keeps spam out of your life`,       
    category: "Privacy Guide",
    author: "Security Team",
    date: "January 15, 2024",
    readTime: "8 min read",
    featured: true,
    views: 2847,
    // Optional: add images/faqs here if you want:
    // images: ["/images/email-privacy-hero.jpg", "/images/img2.jpg", "/images/img3.jpg", "/images/img4.jpg"],
    // faqs: [{ question: "Is temporary mail secure?", answer: "Yes — ..." }, ...]
  },

  "trending-1": {
    id: "trending-1",
    title: "How Temporary Emails Prevent Data Breaches",
    excerpt: "Understanding the connection between temporary email usage and reduced exposure to data breaches.",
    content: `# How Temporary Emails Prevent Data Breaches

Data breaches have become an unfortunate reality of our digital age. Every year, billions of records are exposed, with email addresses being among the most commonly compromised data points. Temporary emails offer a powerful strategy to minimize your exposure to these breaches.

## The Anatomy of Email-Related Data Breaches

When hackers breach a database, they typically target:
- Email addresses (primary identifiers)
- Passwords (often reused across services)
- Personal information linked to those emails
- Associated metadata and behavioral patterns

### Case Study: Major Breaches

Recent significant breaches have exposed:
- **LinkedIn (2021)**: 700 million user records
- **Facebook (2021)**: 533 million users
- **Twitter (2023)**: 200 million email addresses

## How Temporary Emails Create Protection

### Isolation Strategy

By using temporary emails for different services, you create isolation barriers:
- One breach doesn't expose your entire digital identity
- Attackers can't cross-reference data between services
- Your primary email remains protected

### Reduced Attack Surface

Temporary emails minimize your attack surface by:
- Limiting the number of services connected to your main email
- Reducing the data correlation possibilities
- Creating disposable identities that can be abandoned

## Implementation Best Practices

### Email Categorization

Organize your digital life into categories:
1. **Critical**: Banking, healthcare, work
2. **Personal**: Close friends, family
3. **Commercial**: Shopping, subscriptions
4. **Experimental**: Trials, downloads, testing

### Rotation Strategy

Regularly rotate temporary emails:
- Monthly for high-risk categories
- Quarterly for medium-risk services
- Annually for low-risk newsletters

## Conclusion

Temporary emails are a crucial component of modern digital security strategy. They don't just protect against spam—they create fundamental barriers against data breach exploitation.

By compartmentalizing your digital identity, you transform potential catastrophic breaches into manageable, isolated incidents.

Start implementing temporary emails today. Your future self will thank you.`,
    category: "Security",
    author: "Privacy Team",
    date: "January 12, 2024",
    readTime: "5 min read",
    trending: true,
    views: 1923
  },

  "trending-2": {
    id: "trending-2",
    title: "Mail.tm API Integration Best Practices",
    excerpt: "Technical deep-dive into integrating real temporary email services for developers.",
    content: `# Mail.tm API Integration Best Practices

Integrating temporary email functionality into your applications requires careful consideration of API design, error handling, and user experience. This guide covers best practices for working with the Mail.tm API.

## API Overview

Mail.tm provides a RESTful API for temporary email management:
- Domain retrieval
- Account creation
- Message fetching
- Real-time polling

### Authentication Flow

\`\`\`javascript
// 1. Get available domains
const domains = await fetch('https://api.mail.tm/domains').then(r => r.json());

// 2. Create account
const account = await fetch('https://api.mail.tm/accounts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    address: \`user@\${domains[0].domain}\`,
    password: 'securePassword123'
  })
}).then(r => r.json());
\`\`\`

## Error Handling Strategies

### Network Resilience

Implement retry logic with exponential backoff for robust API communication.

### Rate Limiting

Respect API rate limits:
- Implement request queuing
- Add delays between consecutive calls
- Cache responses when appropriate

## Real-time Message Polling

### Efficient Polling Strategy

Implement smart polling that checks for new messages every few seconds while respecting rate limits and optimizing for user experience.

## Performance Optimizations

### Caching Strategies

Cache frequently accessed data:
- Available domains (cache for 1 hour)
- Account information (cache until logout)
- Message lists (cache for 30 seconds)

## Security Considerations

### Token Management

- Store tokens securely
- Implement token refresh logic
- Clear tokens on logout

### Password Generation

Generate secure random passwords for temporary email accounts.

## User Experience Best Practices

### Loading States

Provide clear feedback during operations:
- Email generation in progress
- Message fetching status
- Connection state indicators

### Error Messages

Implement user-friendly error handling with clear, actionable messages.

## Conclusion

Successful Mail.tm integration requires attention to error handling, performance, security, and user experience. By following these best practices, you can build robust applications that provide reliable temporary email functionality.

Remember to always test your integration thoroughly and monitor its performance in production.`,
    category: "Development",
    author: "Dev Team",
    date: "January 10, 2024",
    readTime: "12 min read",
    trending: true,
    views: 3156
  },

  "1": {
    id: "1",
    title: "Why Every Internet User Needs Temporary Emails",
    excerpt: "Explore the growing importance of temporary email addresses in protecting your digital identity and personal information online.",
    content: `# Why Every Internet User Needs Temporary Emails

In today's digital landscape, your email address has become one of your most valuable and vulnerable assets. Every website signup, newsletter subscription, and online purchase creates a new data point that can be collected, analyzed, and potentially compromised.

## The Hidden Cost of Email Exposure

Every time you provide your email address, you're making an implicit trade:
- **Convenience** for privacy
- **Access** for data exposure
- **Free services** for marketing targeting

### The Data Collection Web

Modern websites don't just collect your email—they build comprehensive profiles:
- **Shopping habits** from e-commerce sites
- **Interests** from content subscriptions
- **Location data** from service providers
- **Social connections** from platform integrations

## Real-World Scenarios

### Scenario 1: Online Shopping

Without temporary emails:
- Sign up for sale notifications
- Email gets sold to marketing lists
- Inbox flooded with promotional content
- Primary email compromised in data breach

With temporary emails:
- Use disposable address for shopping
- Receive order confirmations safely
- Abandon email after purchase
- Primary email stays clean and secure

### Scenario 2: Software Downloads

Many software downloads require email addresses for free trials, newsletters, product updates, and data harvesting. Temporary emails solve this by providing access without long-term commitment and protection from unwanted marketing.

## The Privacy Revolution

### Shifting Digital Norms

Privacy expectations are evolving:
- **GDPR** in Europe sets new standards
- **CCPA** in California leads US privacy rights
- **Users demand** more control over their data
- **Companies respond** with privacy-first products

### The Temporary Email Advantage

Temporary emails represent a shift toward:
- **User agency** in data sharing
- **Granular control** over digital identity
- **Risk mitigation** in online activities
- **Privacy by design** in digital habits

## Implementation Strategy

### Email Hierarchy System

Organize your digital life with multiple email tiers:

**Tier 1 - Primary Email**
- Banking and financial services
- Healthcare providers
- Government services
- Close personal contacts

**Tier 2 - Secondary Email**
- Work communications
- Professional networking
- Important subscriptions
- Trusted service providers

**Tier 3 - Temporary Emails**
- Online shopping
- Free trials and downloads
- Newsletter testing
- Unknown websites

## Best Practices

1. **Default to Temporary**: Start with a temporary email for any new service
2. **Upgrade Selectively**: Move to permanent email only after trust is established
3. **Regular Cleanup**: Abandon temporary emails periodically
4. **Monitor Usage**: Track which services have which emails

## Common Objections and Solutions

### "It's Too Complicated"

**Reality**: Modern temporary email services are incredibly simple with one-click email generation, automatic message forwarding, and browser integration.

### "I'll Lose Important Messages"

**Solution**: Strategic email management with permanent emails for important services, forwarding rules for temporary emails, and regular inbox reviews.

## The Future is Private

Temporary emails are not just a privacy tool—they're a fundamental shift toward user empowerment in the digital age. As data becomes increasingly valuable, the ability to control how and when you share your digital identity becomes essential.

## Getting Started Today

1. **Choose a Service**: Select a reliable temporary email provider
2. **Start Small**: Use temporary emails for your next online purchase
3. **Build Habits**: Make temporary emails your default choice
4. **Educate Others**: Share privacy knowledge with friends and family

## Conclusion

Temporary emails are not about paranoia—they're about digital hygiene. Just as you wash your hands to prevent illness, using temporary emails prevents digital contamination.

Your future self will thank you for taking control of your digital identity today.

The question isn't whether you need temporary emails—it's whether you can afford not to use them.`,
    category: "Privacy",
    author: "Editorial Team",
    date: "January 8, 2024",
    readTime: "6 min read",
    views: 1647
  },

  "7": {
    id: "7",
    title: "Common Email Phishing Tactics and Prevention",
    excerpt: "Learn to identify and protect yourself from sophisticated phishing attacks targeting your inbox.",
    content: `# Common Email Phishing Tactics and Prevention

Phishing attacks continue to evolve, becoming more sophisticated and harder to detect. Understanding common tactics helps protect yourself and your organization from email-based threats.

## Current Phishing Landscape

Phishing attacks have increased by 220% since 2020, with email being the primary attack vector. Modern phishing campaigns use advanced techniques to bypass security filters and trick even security-conscious users.

## Common Phishing Tactics

### 1. Spear Phishing

Targeted attacks using personal information:
- Research victims through social media
- Reference real projects, colleagues, or events
- Impersonate trusted contacts or services

### 2. Business Email Compromise (BEC)

Attackers impersonate executives or vendors:
- Request urgent wire transfers
- Ask for sensitive information
- Bypass standard approval processes

### 3. Brand Impersonation

Fake emails from trusted brands:
- Banking and financial services
- Cloud storage providers
- E-commerce platforms
- Government agencies

## Red Flags to Watch For

### Technical Indicators

- **Mismatched URLs**: Hover over links to reveal real destinations
- **Suspicious attachments**: Unexpected files, especially .exe, .zip, or .scr
- **Poor grammar**: Professional organizations rarely send emails with obvious errors
- **Generic greetings**: 'Dear Customer' instead of your name

### Behavioral Indicators

- **Urgency tactics**: 'Act now or your account will be closed'
- **Fear appeals**: 'Your account has been compromised'
- **Requests for sensitive data**: Legitimate companies rarely ask for passwords via email
- **Unexpected winnings**: Lottery or prize notifications you didn't enter

## Prevention Strategies

### Technical Defenses

1. **Email filtering**: Use advanced threat protection
2. **Two-factor authentication**: Enable 2FA on all critical accounts
3. **Software updates**: Keep email clients and browsers current
4. **DNS filtering**: Block known malicious domains

### Human Defenses

1. **Verify independently**: Call or text to confirm unusual requests
2. **Think before clicking**: Hover over links to check destinations
3. **Check sender details**: Look for slight misspellings in email addresses
4. **When in doubt, delete**: Better safe than compromised

## What to Do If You're Targeted

### Immediate Actions

1. **Don't click anything**: Avoid links, attachments, or reply buttons
2. **Report the email**: Forward to your IT security team
3. **Delete the message**: Remove it from your inbox
4. **Check your accounts**: Look for unusual activity

### If You've Been Compromised

1. **Change passwords immediately**: Start with email, then other accounts
2. **Enable 2FA**: Add extra security to all accounts
3. **Monitor accounts**: Watch for unusual activity
4. **Report the incident**: Notify relevant authorities

## Role of Temporary Emails

Temporary emails provide excellent phishing protection:
- **Isolation**: Phishing emails can't access your primary accounts
- **Disposability**: Abandon compromised temporary addresses
- **Testing**: Verify suspicious emails safely
- **Reduced exposure**: Fewer accounts linked to your main email

## Conclusion

Phishing prevention requires constant vigilance and the right tools. By understanding common tactics, recognizing red flags, and using protective strategies like temporary emails, you can significantly reduce your risk of falling victim to email-based attacks.

Remember: When in doubt, verify through alternative channels. No legitimate organization will pressure you to act immediately without proper verification.`,
    category: "Security",
    author: "Security Team",
    date: "December 20, 2023",
    readTime: "6 min read",
    views: 1892
  },

  "8": {
    id: "8",
    title: "Setting Up Email Aliases for Better Organization",
    excerpt: "Organize your digital life with strategic email aliasing techniques and best practices.",
    content: `# Setting Up Email Aliases for Better Organization

Email aliases are a powerful tool for organizing your digital communications without the complexity of multiple email accounts. Learn how to create an efficient aliasing system that protects your privacy and improves productivity.

## What Are Email Aliases?

Email aliases are alternative email addresses that forward messages to your primary inbox. They allow you to:
- Organize incoming mail by source
- Track which services share or sell your email
- Maintain professional appearance
- Protect your primary email address

## Benefits of Email Aliasing

### Organization

- **Automatic sorting**: Set up rules to sort emails into folders
- **Easy identification**: Know immediately what type of email you're receiving
- **Priority management**: Treat different aliases with different urgency levels

### Privacy Protection

- **Primary email protection**: Keep your main address private
- **Tracking prevention**: Identify which services share your information
- **Spam reduction**: Block compromised aliases without affecting others

### Professional Management

- **Role-based addresses**: sales@, support@, info@ for businesses
- **Project organization**: Separate aliases for different clients or projects
- **Team coordination**: Shared aliases for department communications

## Alias Strategies

### Service-Based Aliases

Create aliases for different types of services:

\`\`\`
shopping@yourdomain.com → Online retail purchases
social@yourdomain.com → Social media platforms
news@yourdomain.com → Newsletter subscriptions
finance@yourdomain.com → Banking and financial services
work@yourdomain.com → Professional communications
\`\`\`

### Plus Addressing

Most email providers support plus addressing:

\`\`\`
yourname+shopping@gmail.com
yourname+newsletters@gmail.com
yourname+work@gmail.com
\`\`\`

All emails go to yourname@gmail.com but can be filtered by the plus tag.

## Implementation Guide

### Gmail Plus Addressing

1. **No setup required**: Gmail automatically accepts plus addresses
2. **Create filters**: Use the 'to:' field to sort emails
3. **Set up folders**: Organize by alias category

### Custom Domain Aliases

1. **Domain setup**: Configure DNS and email hosting
2. **Wildcard forwarding**: Forward all aliases to your main account
3. **Management interface**: Use hosting provider's email tools

## Advanced Techniques

### Disposable Aliases

Create one-time aliases for:
- Free trial signups
- Contest entries
- Unknown websites
- Temporary projects

### Alias Rotation

Regularly change aliases for:
- High-risk services
- Frequently targeted categories
- Expired or compromised addresses

## Monitoring and Maintenance

### Tracking Effectiveness

- **Spam levels**: Monitor which aliases receive unwanted email
- **Usage patterns**: Identify most and least used aliases
- **Security incidents**: Track which services experience breaches

### Regular Cleanup

- **Remove unused aliases**: Clean up old, unused addresses
- **Update forwarding**: Ensure aliases still forward correctly
- **Review filters**: Update email rules as needed

### Security Auditing

- **Access logs**: Monitor for unauthorized access
- **Forwarding rules**: Verify emails go to correct destinations
- **Alias enumeration**: Protect against alias discovery attacks

## Common Pitfalls

### Over-Aliasing

- **Too many aliases**: Can become difficult to manage
- **Inconsistent naming**: Use clear, memorable patterns
- **Forgotten aliases**: Document your aliasing system

### Security Weaknesses

- **Predictable patterns**: Avoid obvious naming schemes
- **Single point of failure**: If main account is compromised, all aliases are affected
- **Provider dependence**: What happens if your email provider shuts down?

## Best Practices

### Naming Conventions

1. **Consistent format**: Use a standard pattern across all aliases
2. **Descriptive names**: Make aliases self-explanatory
3. **Avoid personal info**: Don't include birthdays or addresses

### Documentation

1. **Alias registry**: Keep a list of all aliases and their purposes
2. **Service mapping**: Track which services use which aliases
3. **Regular reviews**: Audit your alias usage quarterly

### Integration

1. **Password managers**: Store aliases alongside account credentials
2. **Calendar integration**: Use appropriate aliases for event invitations
3. **Contact management**: Organize contacts by alias categories

## Conclusion

Email aliases provide a powerful way to organize your digital communications while protecting your privacy. Whether using simple plus addressing or complex domain-based strategies, the key is consistency and regular maintenance.

Start small with a few strategic aliases, then expand your system as you become more comfortable with the workflow. Remember: the goal is organization and protection, not complexity for its own sake.`,
    category: "Privacy",
    author: "Editorial Team",
    date: "December 18, 2023",
    readTime: "5 min read",
    views: 1456
  }
};

// ---------------------------
// Helper: Inline markdown -> small HTML (bold, italic, inline code)
// and block renderer (headings, lists, code fences, paragraphs)
// ---------------------------
function inlineMarkdownToHtml(text: string) {
  // protect HTML-sensitive chars only minimally (content is trusted from you)
  let out = text
    .replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm">$1</code>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
  // convert URLs to links (simple)
  out = out.replace(
    /https?:\/\/[^\s)]+/g,
    (url) => `<a href="${url}" class="text-primary underline" target="_blank" rel="noopener noreferrer">${url}</a>`
  );
  return out;
}

export default function BlogPost() {
  const [, params] = useRoute("/blog/:id");
  const postId = params?.id;
  const post = postId ? blogPostsData[postId] : null;

  // If AdSense present, try to push ads for the placeholders
  useEffect(() => {
    if (typeof window !== "undefined") {
      const w = window as any;
      if (w && w.adsbygoogle) {
        try {
          w.adsbygoogle.push({});
        } catch (e) {
          // ignore push errors
        }
      }
    }
  }, [postId]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Split content into blocks (double newlines separate blocks)
  const blocks = post.content.split(/\n{2,}/).map(b => b.trim()).filter(Boolean);

  // Render block to JSX
  const renderBlock = (block: string, idx: number) => {
    // code fence
    if (/^```/.test(block)) {
      const code = block.replace(/^```[^\n]*\n?/, "").replace(/\n?```$/, "");
      return (
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6" key={`code-${idx}`}>
          <code>{code}</code>
        </pre>
      );
    }

    // heading
    const headingMatch = block.match(/^(#{1,6})\s*(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingText = headingMatch[2];
      const sizeClasses = ["text-3xl", "text-2xl", "text-xl", "text-lg", "text-base", "text-sm"];
      const cls = `font-bold mt-8 mb-4 text-foreground ${sizeClasses[Math.min(level - 1, sizeClasses.length - 1)]}`;
      // dynamic heading with React.createElement to satisfy TSX
      return React.createElement(
        `h${level}`,
        { key: `h-${idx}`, className: cls, dangerouslySetInnerHTML: { __html: inlineMarkdownToHtml(headingText) } }
      );
    }

    // unordered list (block of lines starting with - or *)
    if (/^(-|\*)\s+/.test(block)) {
      const items = block.split(/\n/).map(line => line.replace(/^(-|\*)\s+/, "").trim());
      return (
        <ul className="list-disc list-inside my-4 space-y-2" key={`ul-${idx}`}>
          {items.map((li, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: inlineMarkdownToHtml(li) }} />
          ))}
        </ul>
      );
    }

    // ordered list (lines starting with digit.)
    if (/^\d+\.\s+/.test(block)) {
      const items = block.split(/\n/).map(line => line.replace(/^\d+\.\s+/, "").trim());
      return (
        <ol className="list-decimal list-inside my-4 space-y-2" key={`ol-${idx}`}>
          {items.map((li, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: inlineMarkdownToHtml(li) }} />
          ))}
        </ol>
      );
    }

    // paragraph
    return <p key={`p-${idx}`} dangerouslySetInnerHTML={{ __html: inlineMarkdownToHtml(block) }} />;
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/blog" data-testid="link-back-to-blog">
            <Button variant="ghost" className="mb-6 hover:bg-muted/50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          <div className="mb-6">
            <Badge className="bg-primary/10 text-primary mb-4" data-testid="badge-category">
              {post.category}
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight" data-testid="text-article-title">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span data-testid="text-author">{post.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span data-testid="text-date">{post.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span data-testid="text-read-time">{post.readTime}</span>
              </div>
              {post.views && (
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span data-testid="text-views">{post.views.toLocaleString()} views</span>
                </div>
              )}
            </div>
          </div>

          {/* Article Actions */}
          <div className="flex items-center gap-3 mb-8">
            <Button variant="outline" size="sm" data-testid="button-share">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" data-testid="button-bookmark">
              <Bookmark className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="border border-border">
            <CardContent className="p-8 md:p-12">
              {/* Hero image if present */}
              {post.images && post.images[0] && (
                <div className="mb-8">
                  <img
                    src={post.images[0]}
                    alt={post.title}
                    className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
                  />
                </div>
              )}

              {/* Ad Slot 1 (under hero/title) */}
              <div className="my-8 text-center">
                {/* Replace ca-pub & data-ad-slot with your IDs when approved */}
                <ins
                  className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-client="ca-pub-XXXXXXXXXX"
                  data-ad-slot="1111111111"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </div>

              {/* Render content blocks. Insert the mid-article ad after the 2nd block (index 1). */}
              <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground">
                {blocks.map((block, i) => (
                  <React.Fragment key={`block-${i}`}>
                    {renderBlock(block, i)}
                    {/* Insert mid-article ad after block index 1 (i.e. after the 2nd block) */}
                    {i === 1 && (
                      <div className="my-8 text-center">
                        <ins
                          className="adsbygoogle"
                          style={{ display: "block" }}
                          data-ad-client="ca-pub-XXXXXXXXXX"
                          data-ad-slot="2222222222"
                          data-ad-format="auto"
                          data-full-width-responsive="true"
                        ></ins>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Inline / Additional images (images[1..]) */}
              {post.images && post.images.slice(1).length > 0 && (
                <div className="mt-8 space-y-6">
                  {post.images.slice(1).map((img, idx) => (
                    <img key={idx} src={img} alt={`${post.title} image ${idx + 2}`} className="w-full rounded-lg shadow-md" />
                  ))}
                </div>
              )}

              {/* FAQ Section */}
              {post.faqs && post.faqs.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
                  <div className="space-y-6">
                    {post.faqs.map((faq, i) => (
                      <div key={i}>
                        <p className="font-medium text-lg">❓ {faq.question}</p>
                        <p className="text-muted-foreground mt-1">💡 {faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ad Slot 3 - below FAQ/Content */}
              <div className="my-8 text-center">
                <ins
                  className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-client="ca-pub-XXXXXXXXXX"
                  data-ad-slot="3333333333"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Related Articles */}
      <section className="bg-gradient-to-b from-background to-primary/5 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Continue Reading</h2>
          <div className="text-center">
            <Link href="/blog">
              <Button size="lg" data-testid="button-more-articles">
                Explore More Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
