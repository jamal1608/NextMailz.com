import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Route, Switch } from "wouter";
import "./index.css";

// Page imports
import Home from "@client/pages/Home";
import About from "@client/pages/About";
import Privacy from "@client/pages/Privacy";
import NotFound from "@client/pages/not-found";

// Blog components inline
import { useParams } from "wouter";
import { posts } from "@/data/posts";
import BlogCard from "@/components/BlogCard";
import BlogPostComponent from "@/components/BlogPost";

function BlogList() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

function BlogDetail() {
  const params = useParams<{ id: string }>();
  const post = posts.find((p) => p.id === params.id);
  
  if (!post) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold">Post Not Found</h1>
        <p className="mt-4">The blog post you are looking for does not exist.</p>
      </div>
    );
  }
  
  return <BlogPostComponent post={post} />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          
          <main className="flex-1">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/blog" component={BlogList} />
              <Route path="/blog/:id" component={BlogDetail} />
              <Route path="/privacy" component={Privacy} />
              <Route component={NotFound} />
            </Switch>
          </main>
          
          <Footer />
        </div>
        
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;