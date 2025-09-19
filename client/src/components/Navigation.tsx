import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/privacy", label: "Privacy" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" data-testid="link-home">
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="bg-primary w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <Mail className="text-primary-foreground w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-foreground">NextMailz</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ href, label }) => (
              <Link key={href} href={href} data-testid={`link-${label.toLowerCase()}`}>
                <div
                  className={cn(
                    "px-4 py-2 rounded-lg transition-all cursor-pointer relative",
                    isActive(href)
                      ? "text-primary bg-primary/10 font-medium"
                      : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                  )}
                >
                  {label}
                  {isActive(href) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Generate Email
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur border-t border-border">
          <div className="px-4 py-4 space-y-2">
            {navItems.map(({ href, label }) => (
              <Link key={href} href={href} data-testid={`mobile-link-${label.toLowerCase()}`}>
                <div
                  className={cn(
                    "block px-4 py-3 rounded-lg cursor-pointer transition-all",
                    isActive(href)
                      ? "text-primary bg-primary/10 font-medium"
                      : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {label}
                </div>
              </Link>
            ))}
            
            {/* Mobile CTA */}
            <div className="pt-2 border-t border-border">
              <Link href="/">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Generate Email
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}