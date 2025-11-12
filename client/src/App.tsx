import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Route, Switch, useRoute } from "wouter";
import Home from "@client/pages/Home";
import About from "@client/pages/About";
import Privacy from "@client/pages/Privacy";
import NotFound from "@client/pages/not-found";
import "./index.css";

// Lazy load blog components
import { lazy, Suspense } from "react";
const Blog = lazy(() => import("@client/pages/blog/index"));
const BlogPost = lazy(() => import("@client/pages/blog/BlogPost"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          
          <main className="flex-1">
            <Suspense fallback={<div className="flex items-center justify-center h-64">Loading...</div>}>
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/blog" component={Blog} />
                <Route path="/blog/:id" component={BlogPost} />
                <Route path="/privacy" component={Privacy} />
                <Route component={NotFound} />
              </Switch>
            </Suspense>
          </main>
          
          <Footer />
        </div>
        
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;