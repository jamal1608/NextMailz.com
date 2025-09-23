import React, { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  Share2,
  Bookmark,
  Eye,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// ---------------- Blog Data ----------------
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  views?: number;
  images?: string[];
  faqs?: { question: string; answer: string }[];
}

const blogPostsData: Record<string, BlogPost> = {
  "1": {
    id: "1",
    title: "Why Every Internet User Needs Temporary Emails",
    excerpt:
      "Explore the growing importance of temporary email addresses in protecting your digital identity.",
    content: `# Why Every Internet User Needs Temporary Emails

Temporary emails are powerful...`,
    category: "Privacy",
    author: "Editorial Team",
    date: "Jan 8, 2024",
    readTime: "6 min read",
    views: 1647,
    images: ["/images/blog-hero.jpg"],
    faqs: [
      {
        question: "Are temporary emails secure?",
        answer: "Yes, they protect your real inbox and can be discarded anytime.",
      },
    ],
  },
  // add more posts...
};

// ---------------- Markdown Renderer ----------------
function inlineMarkdownToHtml(text: string) {
  return text
    .replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm">$1</code>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /https?:\/\/[^\s)]+/g,
      (url) =>
        `<a href="${url}" class="text-primary underline" target="_blank" rel="noopener noreferrer">${url}</a>`
    );
}

export default function BlogPost() {
  const [, params] = useRoute("/blog/:id");
  const postId = params?.id;
  const post = postId ? blogPostsData[postId] : null;

  const [headings, setHeadings] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).adsbygoogle) {
      try {
        (window as any).adsbygoogle.push({});
      } catch {}
    }
  }, [postId]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Split into blocks
  const blocks = post.content.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);

  const renderBlock = (block: string, idx: number) => {
    const headingMatch = block.match(/^(#{1,6})\s*(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      if (!headings.includes(text)) setHeadings((prev) => [...prev, text]);
      return React.createElement(`h${level}`, {
        key: idx,
        id: text.toLowerCase().replace(/\s+/g, "-"),
        className: "mt-8 mb-4 font-bold text-foreground",
        dangerouslySetInnerHTML: { __html: inlineMarkdownToHtml(text) },
      });
    }
    return (
      <p
        key={idx}
        className="mb-4"
        dangerouslySetInnerHTML={{ __html: inlineMarkdownToHtml(block) }}
      />
    );
  };

  // Social Share Handler
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const copyLink = () => navigator.clipboard.writeText(shareUrl);

  return (
    <div className="min-h-screen flex">
      {/* Main Content */}
      <div className="flex-1">
        <section className="bg-gradient-to-b from-primary/5 to-background py-12">
          <div className="max-w-4xl mx-auto px-6">
            <Link href="/blog">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
              </Button>
            </Link>
            <Badge className="bg-primary/10 text-primary">{post.category}</Badge>
            <h1 className="text-4xl font-bold mt-4">{post.title}</h1>
            <div className="flex gap-4 text-sm text-muted-foreground mt-2">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" /> {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {post.readTime}
              </span>
              {post.views && (
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" /> {post.views} views
                </span>
              )}
            </div>
            {/* Share buttons top */}
            <div className="flex gap-3 mt-6">
              <Button size="sm" variant="outline">
                <Facebook className="w-4 h-4 mr-2" /> Facebook
              </Button>
              <Button size="sm" variant="outline">
                <Twitter className="w-4 h-4 mr-2" /> Twitter
              </Button>
              <Button size="sm" variant="outline">
                <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
              </Button>
              <Button size="sm" variant="outline" onClick={copyLink}>
                <Copy className="w-4 h-4 mr-2" /> Copy Link
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <Card>
              <CardContent className="p-8">
                {post.images && (
                  <img
                    src={post.images[0]}
                    alt={post.title}
                    className="rounded-lg mb-6"
                  />
                )}

                {/* Ad slot */}
                <div className="my-6 text-center">
                  <ins
                    className="adsbygoogle"
                    style={{ display: "block" }}
                    data-ad-client="ca-pub-XXXX"
                    data-ad-slot="111111"
                  ></ins>
                </div>

                <div className="prose max-w-none dark:prose-invert">
                  {blocks.map((b, i) => renderBlock(b, i))}
                </div>

                {/* Bottom Share */}
                <div className="flex gap-3 mt-12">
                  <Button size="sm" variant="outline">
                    <Facebook className="w-4 h-4 mr-2" /> Share
                  </Button>
                  <Button size="sm" variant="outline">
                    <Twitter className="w-4 h-4 mr-2" /> Tweet
                  </Button>
                  <Button size="sm" variant="outline" onClick={copyLink}>
                    <Copy className="w-4 h-4 mr-2" /> Copy
                  </Button>
                </div>

                {/* Author Bio */}
                <div className="mt-12 border-t pt-6">
                  <h3 className="font-bold text-lg">About the Author</h3>
                  <p className="text-muted-foreground">
                    {post.author} writes about privacy, security, and digital
                    freedom.
                  </p>
                </div>

                {/* Related Articles */}
                <div className="mt-12">
                  <h3 className="font-bold text-xl mb-4">Related Articles</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.values(blogPostsData)
                      .filter((p) => p.id !== post.id)
                      .slice(0, 2)
                      .map((rel) => (
                        <Card key={rel.id}>
                          <CardContent className="p-4">
                            <h4 className="font-semibold">{rel.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                              {rel.excerpt}
                            </p>
                            <Link href={`/blog/${rel.id}`}>
                              <Button size="sm" variant="ghost">
                                Read More
                              </Button>
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* Right Sidebar TOC */}
      <aside className="hidden lg:block w-72 sticky top-20 h-screen px-6 py-8 border-l border-border bg-background">
        <h3 className="font-semibold mb-4">Table of Contents</h3>
        <ul className="space-y-2 text-sm">
          {headings.map((h, i) => (
            <li key={i}>
              <a href={`#${h.toLowerCase().replace(/\s+/g, "-")}`} className="hover:underline">
                {h}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            author: post.author,
            datePublished: post.date,
            description: post.excerpt,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://yourdomain.com/blog/${post.id}`,
            },
          }),
        }}
      />
      {post.faqs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: post.faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            }),
          }}
        />
      )}
    </div>
  );
}
