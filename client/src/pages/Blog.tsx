import { ArrowRight, Calendar, User, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
  trending?: boolean;
}

// Reusable Blog Card
interface BlogCardProps extends BlogPost {
  variant?: "featured" | "trending" | "default";
}

const BlogCard = ({ title, excerpt, category, author, date, readTime, variant = "default" }: BlogCardProps) => {
  const badgeVariant = variant === "featured" ? "secondary" : "outline";
  return (
    <Card className={`border border-border hover:shadow-lg transition-shadow ${variant === "featured" ? "md:col-span-2" : ""}`}>
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
          <Badge variant={badgeVariant}>{category}</Badge>
          <span>•</span>
          <span>{readTime}</span>
        </div>

        <h3 className={`text-lg font-semibold text-foreground mb-3 ${variant === "featured" ? "text-2xl" : ""}`}>
          {title}
        </h3>

        <p className={`text-muted-foreground text-sm mb-4 ${variant === "featured" ? "leading-relaxed" : ""}`}>
          {excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center space-x-1">
            <User className="w-3 h-3" />
            <span>{author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{date}</span>
          </div>
        </div>

        <Link href={`/blog/${title}`}>
          <Button variant="ghost" size="sm" className="w-full">
            Read Article <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default function Blog() {
  const [displayedPosts, setDisplayedPosts] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Privacy", "Security", "Technology", "Development", "Reviews", "Insights"];

  const featuredPost: BlogPost = {
    id: "featured-1",
    title: "Best Ways to Protect Your Email from Spam in 2025",
    excerpt:
      "Discover comprehensive strategies to protect your email privacy from spam, encryption, and advanced security practices. Learn how to stay anonymous online while maintaining productivity.",
    category: "Privacy Guide",
    author: "Security Team",
    date: "January 15, 2024",
    readTime: "8 min read",
    featured: true,
  };

  const trendingPosts: BlogPost[] = [
    {
      id: "trending-1",
      title: "How Temporary Emails Prevent Data Breaches",
      excerpt: "Understanding the connection between temporary email usage and reduced exposure to data breaches.",
      category: "Security",
      author: "Privacy Team",
      date: "January 12, 2024",
      readTime: "5 min read",
      trending: true,
    },
    {
      id: "trending-2",
      title: "Mail.tm API Integration Best Practices",
      excerpt: "Technical deep-dive into integrating real temporary email services for developers.",
      category: "Development",
      author: "Dev Team",
      date: "January 10, 2024",
      readTime: "12 min read",
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
    },
    {
      id: "3",
      title: "The Technology Behind Real-Time Email Reception",
      excerpt: "Understanding the technical infrastructure that enables instant email delivery and real-time inbox updates.",
      category: "Technology",
      author: "Engineering Team",
      date: "January 3, 2024",
      readTime: "7 min read",
    },
    // ... add the rest of your posts here
  ];

  // Filter posts based on selected category
  const filteredPosts =
    selectedCategory === "All" ? blogPosts : blogPosts.filter((post) => post.category === selectedCategory);

  const postsToDisplay = filteredPosts.slice(0, displayedPosts);
  const hasMore = displayedPosts < filteredPosts.length;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Knowledge Hub
            </Badge>
            <h1 className="text-5xl font-bold text-foreground mb-6">NextMailz Blog</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with the latest insights on email privacy, security best practices, and NextMailz platform
              updates.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 overflow-x-auto py-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === selectedCategory ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => {
                  setSelectedCategory(category);
                  setDisplayedPosts(6);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Featured Post */}
        <section className="mb-16">
          <h2 className="flex items-center space-x-2 text-2xl font-bold text-foreground mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Featured Article</span>
          </h2>
          <BlogCard {...featuredPost} variant="featured" />
        </section>

        {/* Trending Posts */}
        <section className="mb-16">
          <h2 className="flex items-center space-x-2 text-2xl font-bold text-foreground mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span>Trending Now</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {trendingPosts.map((post) => (
              <BlogCard key={post.id} {...post} variant="trending" />
            ))}
          </div>
        </section>

        {/* Recent Posts */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Recent Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {postsToDisplay.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        </section>

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setDisplayedPosts((prev) => Math.min(prev + 6, filteredPosts.length))}
            >
              Load More Articles
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
