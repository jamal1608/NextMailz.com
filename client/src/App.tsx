import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

import "@/styles/globals.css";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          {/* ✅ Navigation sab pages me common */}
          <Navigation />

          {/* ✅ Page content */}
          <main className="flex-1">
            {/* Yaha tum React Router se pages render karoge */}
          </main>

          {/* ✅ Footer */}
          <Footer />
        </div>

        {/* ✅ Toast notifications */}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;


