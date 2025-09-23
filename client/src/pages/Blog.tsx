import { ArrowRight, Calendar, User, Tag, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";
import AdBanner from "@/components/AdBanner";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image?: string; // ✅ added image support
  featured?: boolean;
  trending?: boolean;
}

export default function Blog() {
  const [displayedPosts, setDisplayedPosts] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const featuredPost: BlogPost = {
    id: "featured-1",
    title: "Best Ways to Protect Your Email from Spam in 2025",
    excerpt:
      "Discover comprehensive strategies to protect your email privacy from spam, encryption, and advanced security practices.",
    category: "Privacy Guide",
    author: "Security Team",
    date: "January 15, 2024",
    readTime: "8 min read",
    image: "https://source.unsplash.com/800x500/?cybersecurity,privacy", // ✅ sample image
    featured: true,
  };

  const trendingPosts: BlogPost[] = [
    {
      id: "trending-1",
      title: "How Temporary Emails Prevent Data Breaches",
      excerpt:
        "Understanding the connection between temporary email usage and reduced exposure to data breaches.",
      category: "Security",
      author: "Privacy Team",
      date: "January 12, 2024",
      readTime: "5 min read",
      image: "https://source.unsplash.com/600x400/?hacker,security",
      trending: true,
    },
    {
      id: "trending-2",
      title: "Mail.tm API Integration Best Practices",
      excerpt:
        "Technical deep-dive into integrating real temporary email services for developers.",
      category: "Development",
      author: "Dev Team",
      date: "January 10, 2024",
      readTime: "12 min read",
      image: "https://source.unsplash.com/600x400/?code,developer",
      trending: true,
    },
  ];

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Why Every Internet User Needs Temporary Emails",
      excerpt:
        "Explore the growing importance of temporary email addresses in protecting your digital identity and personal information online.",
      category: "Privacy",
      author: "Editorial Team",
      date: "January 8, 2024",
      readTime: "6 min read",
      image: "https://source.unsplash.com/400x300/?email,privacy",
    },
    {
      id: "2",
      title: "Comparing Temporary Email Services: Features That Matter",
      excerpt:
        "A comprehensive comparison of temporary email services, focusing on security, reliability, and user experience factors.",
      category: "Reviews",
      author: "Research Team",
      date: "January 5, 2024",
      readTime: "10 min read",
      image: "https://source.unsplash.com/400x300/?comparison,tech",
    },
    {
      id: "3",
      title: "The Technology Behind Real-Time Email Reception",
      excerpt:
        "Understanding the technical infrastructure that enables instant email delivery and real-time inbox updates.",
      category: "Technology",
      author: "Engineering Team",
      date: "January 3, 2024",
      readTime: "7 min read",
      image: "https://source.unsplash.com/400x300/?technology,email",
    },
  ];

  const categories = [
    "All",
    "Privacy",
    "Security",
    "Technology",
    "Development",
    "Reviews",
    "Insights",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Badge variant="secondary" className="mb-4">
            Knowledge Hub
          </Badge>
          <h1 className="text-5xl font-bold mb-6">NextMailz Blog</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest insights on email privacy, security best practices, and NextMailz platform updates.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Featured Post */}
        <section className="mb-16">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">Featured Article</h2>
          </div>

          <Card className="overflow-hidden hover:shadow-xl transition">
            {featuredPost.image && (
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-64 object-cover"
              />
            )}
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
              <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
              <Link href={`/blog/${featuredPost.id}`}>
                <Button className="bg-primary hover:bg-primary/90">
                  Read Article <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* Insert Ad */}
        <div className="my-12">
          <AdBanner
            type="horizontal"
            title="Boost Your Privacy"
            description="Use NextMailz with VPN & Password Manager to stay safe."
            company="Privacy Corp"
            ctaText="Try Free"
            colors={{
              bg: "bg-indigo-600",
              text: "text-white",
              accent: "text-indigo-200",
            }}
          />
        </div>

        {/* Trending Posts */}
        <section className="mb-16">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold">Trending Now</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {trendingPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                  <Link href={`/blog/${post.id}`}>
                    <Button variant="ghost" size="sm">
                      Read More <ArrowRight className="ml-1 w-3 h-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Posts */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Recent Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(0, displayedPosts).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg">
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{post.excerpt}</p>
                  <Link href={`/blog/${post.id}`}>
                    <Button variant="ghost" size="sm" className="w-full">
                      Read Article <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
