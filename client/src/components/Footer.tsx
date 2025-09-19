import { Link } from "wouter";
import { Mail, Github, Twitter, Shield, Clock, Zap } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const features = [
    { icon: Clock, text: "10-min lifespan" },
    { icon: Shield, text: "100% private" },
    { icon: Zap, text: "Instant delivery" }
  ];

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-primary w-12 h-12 rounded-xl flex items-center justify-center">
                <Mail className="text-primary-foreground w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-foreground">NextMailz</span>
            </div>

            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              The most advanced temporary email service for privacy-conscious users.
              Generate secure, anonymous email addresses instantly with real-time delivery.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 mb-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-muted/50 px-3 py-2 rounded-full text-sm"
                >
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-muted/50 rounded-lg"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-muted/50 rounded-lg"
                aria-label="Star us on GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link href="/"><span className="hover:text-primary">Home</span></Link></li>
              <li><Link href="/about"><span className="hover:text-primary">About</span></Link></li>
              <li><Link href="/blog"><span className="hover:text-primary">Blog</span></Link></li>
              <li><a href="#features" className="hover:text-primary">Features</a></li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal & Support</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link href="/privacy"><span className="hover:text-primary">Privacy Policy</span></Link></li>
              <li><Link href="/terms"><span className="hover:text-primary">Terms of Service</span></Link></li>
              <li><Link href="/support"><span className="hover:text-primary">Support Center</span></Link></li>
              <li><Link href="/api"><span className="hover:text-primary">API Documentation</span></Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <span className="text-muted-foreground text-sm">
              © {currentYear} NextMailz. All rights reserved.
            </span>
            <span className="text-muted-foreground text-sm">
              Built for privacy-first communication.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
