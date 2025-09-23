import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo3D from "@/components/Logo3D";

export default function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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

  // toggle theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" data-testid="link-home">
            <div className="flex items-center space-x-3 cursor-pointer group">
              <Logo3D size={48} />
              <span className="text-xl font-bold text-foreground">NextMailz</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
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

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="ml-4"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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

            {/* Theme Toggle for Mobile */}
            <div className="pt-2 border-t border-border">
              <Button
                className="w-full"
                variant="outline"
                onClick={toggleTheme}
              >
                {darkMode ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="h-5 w-5 mr-2" />}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
