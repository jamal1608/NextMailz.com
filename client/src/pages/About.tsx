import { Shield, Clock, Smartphone, Zap, Mail, Users, Globe, Lock, HelpCircle, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function About() {
  const features = [
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your privacy is our top priority. We don't track, store, or share your personal information. All temporary emails are automatically deleted after expiration."
    },
    {
      icon: Clock,
      title: "10-Minute Lifespan", 
      description: "Each temporary email address lasts exactly 10 minutes - perfect for quick signups, downloads, or any service requiring email verification."
    },
    {
      icon: Globe,
      title: "Real Email Integration",
      description: "Powered by Mail.tm API for authentic email delivery. Receive real emails from real services with full compatibility."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "No registration required. Generate temporary email addresses instantly and receive emails in real-time with auto-refresh."
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Fully responsive design works perfectly on desktop, tablet, and mobile devices. Access your inbox from anywhere."
    },
    {
      icon: Lock,
      title: "Secure by Design",
      description: "All communications are encrypted with HTTPS. Email data is automatically purged, leaving no digital footprint."
    }
  ];

  const steps = [
    { number: 1, title: "Choose Domain", description: "Select from multiple available domains or let us choose automatically" },
    { number: 2, title: "Generate Email", description: "Click generate to create your temporary email address instantly" },
    { number: 3, title: "Use Anywhere", description: "Copy and use the address for signups, downloads, or verification" },
    { number: 4, title: "Receive Messages", description: "View incoming emails in real-time with automatic polling" }
  ];

  const stats = [
    { number: "10min", label: "Email Lifespan" },
    { number: "5sec", label: "Real-time Updates" },
    { number: "100%", label: "Anonymous" },
    { number: "∞", label: "Free Usage" }
  ];

  const faqs = [
    {
      q: "What is temporary email?",
      a: "Temporary email provides you with a disposable inbox that automatically expires. It's perfect for one-time signups, downloads, or testing services."
    },
    {
      q: "Why should I use it?",
      a: "To protect your privacy, avoid spam, and keep your personal email address safe. It's also useful for testing apps and websites."
    },
    {
      q: "Is it secure?",
      a: "Yes. All emails are encrypted via HTTPS and automatically deleted after expiration. However, do not use it for sensitive accounts like banking."
    },
    {
      q: "Can I send emails?",
      a: "No. Temporary emails are receive-only. You can use them to receive verification links, newsletters, or download confirmations."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary w-16 h-16 rounded-2xl flex items-center justify-center">
              <Mail className="text-primary-foreground w-8 h-8" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6">About NextMailz</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            The most advanced temporary email service for privacy-conscious users. Generate secure, anonymous email addresses instantly with NextMailz - your trusted privacy companion.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose NextMailz?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with modern technology and security best practices to provide the ultimate temporary email experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Process</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting started with NextMailz is simple and takes less than 30 seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <Card key={step.number} className="text-center border border-border">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-xl">
                    {step.number}
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">{step.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Badge variant="secondary" className="mb-4">Technology</Badge>
          <h2 className="text-4xl font-bold text-foreground mb-6">Built for the Modern Web</h2>
          <p className="text-lg text-muted-foreground mb-12">
            NextMailz is built with cutting-edge technology to ensure reliability, security, and performance.
          </p>
          
          <Card className="border border-border">
            <CardContent className="p-12">
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div>
                  <Users className="w-8 h-8 text-primary mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">Real-time Updates</h4>
                  <p className="text-sm text-muted-foreground">Powered by modern polling technology for instant email delivery notifications.</p>
                </div>
                <div>
                  <Globe className="w-8 h-8 text-primary mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">Global Infrastructure</h4>
                  <p className="text-sm text-muted-foreground">Integrated with Mail.tm's worldwide network for maximum compatibility.</p>
                </div>
                <div>
                  <Shield className="w-8 h-8 text-primary mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">Enterprise Security</h4>
                  <p className="text-sm text-muted-foreground">Bank-level encryption and automatic data purging for ultimate privacy.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <HelpCircle className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-foreground mb-4">FAQ</h2>
            <p className="text-lg text-muted-foreground">Frequently asked questions about NextMailz</p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-border pb-6">
                <h4 className="text-xl font-semibold text-foreground mb-2">{faq.q}</h4>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms & Privacy Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FileText className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-foreground mb-4">Terms & Privacy</h2>
          <p className="text-lg text-muted-foreground mb-8">
            By using NextMailz, you agree to the following:
          </p>

          <div className="text-left space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Terms of Service</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                NextMailz provides disposable temporary email addresses for free. 
                The service is intended for short-term use only. We are not responsible 
                for any loss, misuse, or consequences of using disposable emails for critical services.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-foreground mb-2">Privacy Policy</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We do not collect or store personal data. All emails are automatically deleted after expiration. 
                No tracking, no sharing, no profiling. Your privacy is 100% respected.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
