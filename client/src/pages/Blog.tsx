import { ArrowRight, Calendar, User, Tag, TrendingUp } from "lucide-react";
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

export default function Blog() {
  const [displayedPosts, setDisplayedPosts] = useState(6); // Initially show 6 posts
  const [selectedCategory, setSelectedCategory] = useState("All");

  const featuredPost: BlogPost = {
    id: "featured-1",
    title: "Best Ways to Protect Your Email from Spam in 2025",
    excerpt: "Discover comprehensive strategies to protect your email privacy from spam, encryption, and advanced security practices. Learn how to stay anonymous online while maintaining productivity.",
    category: "Privacy Guide",
    author: "Security Team",
    date: "January 15, 2024",
    readTime: "8 min read",
    featured: true
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
      trending: true
    },
    {
      id: "trending-2",
      title: "Mail.tm API Integration Best Practices",
      excerpt: "Technical deep-dive into integrating real temporary email services for developers.",
      category: "Development",
      author: "Dev Team",
      date: "January 10, 2024",
      readTime: "12 min read",
      trending: true
    }
  ];

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Why Every Internet User Needs Temporary Emails",
      excerpt: "Explore the growing importance of temporary email addresses in protecting your digital identity and personal information online.",
      category: "Privacy",
      author: "Editorial Team",
      date: "January 8, 2024",
      readTime: "6 min read"
    },
    {
      id: "2", 
      title: "Comparing Temporary Email Services: Features That Matter",
      excerpt: "A comprehensive comparison of temporary email services, focusing on security, reliability, and user experience factors.",
      category: "Reviews",
      author: "Research Team",
      date: "January 5, 2024",
      readTime: "10 min read"
    },
    {
      id: "3",
      title: "The Technology Behind Real-Time Email Reception", 
      excerpt: "Understanding the technical infrastructure that enables instant email delivery and real-time inbox updates.",
      category: "Technology",
      author: "Engineering Team",
      date: "January 3, 2024",
      readTime: "7 min read"
    },
    {
      id: "4",
      title: "Email Security Threats in 2024: What You Need to Know",
      excerpt: "Stay informed about the latest email-based security threats and learn how temporary emails can protect you.",
      category: "Security", 
      author: "Security Team",
      date: "December 28, 2023",
      readTime: "9 min read"
    },
    {
      id: "5",
      title: "Building Privacy-First Applications",
      excerpt: "Developer guidelines for creating applications that respect user privacy from the ground up.",
      category: "Development",
      author: "Dev Team",
      date: "December 25, 2023",
      readTime: "11 min read"
    },
    {
      id: "6",
      title: "The Future of Digital Communication Privacy",
      excerpt: "Exploring emerging trends in privacy-focused communication tools and their impact on digital freedom.",
      category: "Insights",
      author: "Strategy Team",
      date: "December 22, 2023",
      readTime: "8 min read"
    },
    {
      id: "7",
      title: "Common Email Phishing Tactics and Prevention",
      excerpt: "Learn to identify and protect yourself from sophisticated phishing attacks targeting your inbox.",
      category: "Security",
      author: "Security Team",
      date: "December 20, 2023",
      readTime: "6 min read"
    },
    {
      id: "8",
      title: "Setting Up Email Aliases for Better Organization",
      excerpt: "Organize your digital life with strategic email aliasing techniques and best practices.",
      category: "Privacy",
      author: "Editorial Team",
      date: "December 18, 2023",
      readTime: "5 min read"
    },
    {
      id: "9",
      title: "Email Automation Tools for Developers",
      excerpt: "Streamline your development workflow with powerful email automation and testing tools.",
      category: "Development",
      author: "Dev Team",
      date: "December 15, 2023",
      readTime: "9 min read"
    },
    {
      id: "10",
      title: "The Evolution of Email Marketing Privacy",
      excerpt: "How privacy regulations are reshaping email marketing and what it means for users.",
      category: "Insights",
      author: "Strategy Team",
      date: "December 12, 2023",
      readTime: "7 min read"
    }
  ];

  const categories = ["All", "Privacy", "Security", "Technology", "Development", "Reviews", "Insights"];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Knowledge Hub</Badge>
            <h1 className="text-5xl font-bold text-foreground mb-6" data-testid="text-blog-title">
              NextMailz Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-blog-subtitle">
              Stay updated with the latest insights on email privacy, security best practices, and NextMailz platform updates.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === selectedCategory ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => {
                  setSelectedCategory(category);
                  setDisplayedPosts(6); // Reset to initial count when filtering
                }}
                data-testid={`button-category-${category.toLowerCase()}`}
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
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Featured Article</h2>
          </div>
          
          <Card className="border border-border overflow-hidden hover:shadow-xl transition-shadow" data-testid="card-featured-post">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center space-x-3 text-sm text-muted-foreground mb-4">
                    <Badge className="bg-primary/10 text-primary" data-testid="badge-featured">
                      {featuredPost.category}
                    </Badge>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span data-testid="text-featured-date">{featuredPost.date}</span>
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-foreground mb-4" data-testid="text-featured-title">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed" data-testid="text-featured-excerpt">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{featuredPost.readTime}</span>
                    <Link href={`/blog/${featuredPost.id}`}>
                      <Button className="bg-primary hover:bg-primary/90" data-testid="button-read-featured">
                        Read Article <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-8 text-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Tag className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Privacy Guide</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive strategies for digital privacy
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Trending Posts */}
        <section className="mb-16">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Trending Now</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {trendingPosts.map((post) => (
              <Card key={post.id} className="border border-border hover:shadow-lg transition-shadow" data-testid={`card-trending-${post.id}`}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                    <Badge variant="secondary" data-testid={`badge-category-${post.id}`}>{post.category}</Badge>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-3" data-testid={`text-trending-title-${post.id}`}>
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed" data-testid={`text-trending-excerpt-${post.id}`}>
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span data-testid={`text-trending-date-${post.id}`}>{post.date}</span>
                    </div>
                    <Link href={`/blog/${post.id}`}>
                      <Button variant="ghost" size="sm" data-testid={`button-read-${post.id}`}>
                        Read More <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Posts */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Recent Articles</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(0, displayedPosts).map((post) => (
              <Card key={post.id} className="border border-border hover:shadow-lg transition-shadow" data-testid={`card-post-${post.id}`}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-3">
                    <Badge variant="outline" data-testid={`badge-category-${post.id}`}>{post.category}</Badge>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2" data-testid={`text-title-${post.id}`}>
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3" data-testid={`text-excerpt-${post.id}`}>
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span data-testid={`text-date-${post.id}`}>{post.date}</span>
                    </div>
                  </div>
                  
                  <Link href={`/blog/${post.id}`}>
                    <Button variant="ghost" size="sm" className="w-full" data-testid={`button-read-${post.id}`}>
                      Read Article <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Load More */}
        {displayedPosts < blogPosts.length && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg" 
              data-testid="button-load-more"
              onClick={() => setDisplayedPosts(prev => Math.min(prev + 6, blogPosts.length))}
            >
              Load More Articles
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}