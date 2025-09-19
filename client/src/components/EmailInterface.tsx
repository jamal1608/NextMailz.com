import { useState, useEffect } from "react";
import { Copy, RefreshCw, Clock, Mail, User, Building2, Bell, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import AdBanner from "@/components/AdBanner";


interface Domain {
  id: string;
  domain: string;
  isActive: boolean;
}

interface TemporaryEmail {
  id: string;
  email: string;
  domain: string;
  expiresAt: string;
  isActive: boolean;
  createdAt: string;
}

interface Message {
  id: string;
  emailId: string;
  sender: string;
  subject: string;
  body: string;
  isRead: boolean;
  receivedAt: string;
}

interface EmailStatus {
  email: string;
  isActive: boolean;
  expiresAt: string;
  timeRemaining: number;
}

export default function EmailInterface() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentEmail, setCurrentEmail] = useState<TemporaryEmail | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  // Fetch available domains
  const { data: domains = [] } = useQuery<Domain[]>({
    queryKey: ["/api/domains"],
    staleTime: 300000, // 5 minutes
  });

  // Fetch messages for current email
  const { data: messages = [], refetch: refetchMessages } = useQuery<Message[]>({
    queryKey: ["/api/messages", currentEmail?.email],
    enabled: !!currentEmail?.email,
    refetchInterval: 5000, // Poll every 5 seconds
  });

  // Fetch email status
  const { data: emailStatus } = useQuery<EmailStatus>({
    queryKey: ["/api/email", currentEmail?.email, "status"],
    enabled: !!currentEmail?.email,
    refetchInterval: 1000, // Update every second for countdown
  });

  // Generate email mutation
  const generateEmailMutation = useMutation({
    mutationFn: async (domain?: string) => {
      const response = await apiRequest("POST", "/api/generate", { domain });
      return response.json();
    },
    onSuccess: (data: TemporaryEmail) => {
      setCurrentEmail(data);
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
      toast({
        title: "Email Generated!",
        description: "Your temporary email is ready to receive messages.",
      });
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: "Failed to generate temporary email. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Mark message as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async (messageId: string) => {
      await apiRequest("POST", `/api/messages/${messageId}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
    },
  });

  // Update countdown timer
  useEffect(() => {
    if (emailStatus) {
      setTimeRemaining(emailStatus.timeRemaining);
    }
  }, [emailStatus]);

  const generateNewEmail = () => {
    generateEmailMutation.mutate(selectedDomain);
  };

  const copyEmail = async () => {
    if (!currentEmail) return;
    
    try {
      await navigator.clipboard.writeText(currentEmail.email);
      toast({
        title: "Email Copied!",
        description: "Email address copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy email to clipboard.",
        variant: "destructive",
      });
    }
  };

  const refreshInbox = () => {
    refetchMessages();
    toast({
      title: "Inbox Refreshed",
      description: "Checking for new messages...",
    });
  };

  const formatTimeRemaining = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const getMessageIcon = (sender: string) => {
    if (sender.includes('noreply') || sender.includes('no-reply')) {
      return <Bell className="w-4 h-4" />;
    }
    if (sender.includes('support') || sender.includes('team')) {
      return <Building2 className="w-4 h-4" />;
    }
    return <User className="w-4 h-4" />;
  };

  const unreadCount = messages.filter(m => !m.isRead).length;

  // Ad banner configurations
  const verticalAds = [
    {
      title: "Secure VPN Service",
      description: "Protect your online privacy with military-grade encryption. Get 3 months free!",
      company: "PrivateVPN Pro",
      ctaText: "Get VPN Now",
      colors: { bg: "bg-gradient-to-b from-blue-600 to-blue-700", text: "text-white", accent: "text-blue-200" }
    },
    {
      title: "Password Manager", 
      description: "Store all your passwords securely in one place. Never forget a password again!",
      company: "SecurePass",
      ctaText: "Start Free Trial",
      colors: { bg: "bg-gradient-to-b from-green-600 to-green-700", text: "text-white", accent: "text-green-200" }
    }
  ];

  const horizontalAds = [
    {
      title: "Email Security Scanner",
      description: "Scan your emails for threats and phishing attempts automatically",
      company: "EmailGuard",
      ctaText: "Try Free",
      colors: { bg: "bg-gradient-to-r from-purple-500 to-purple-600", text: "text-white", accent: "text-purple-200" }
    },
    {
      title: "Cloud Storage - 50GB Free",
      description: "Secure cloud storage with end-to-end encryption",
      company: "CloudVault",
      ctaText: "Sign Up",
      colors: { bg: "bg-gradient-to-r from-orange-500 to-orange-600", text: "text-white", accent: "text-orange-200" }
    },
    {
      title: "Anonymous File Sharing",
      description: "Share files privately without revealing your identity",
      company: "GhostShare",
      ctaText: "Share Now",
      colors: { bg: "bg-gradient-to-r from-gray-700 to-gray-800", text: "text-white", accent: "text-gray-300" }
    },
    {
      title: "Encrypted Messaging App",
      description: "Chat securely with disappearing messages and zero logs",
      company: "SecretChat",
      ctaText: "Download",
      colors: { bg: "bg-gradient-to-r from-indigo-500 to-indigo-600", text: "text-white", accent: "text-indigo-200" }
    },
    {
      title: "Privacy Browser Extension",
      description: "Block trackers, ads, and protect your browsing privacy",
      company: "PrivacyShield",
      ctaText: "Install Free",
      colors: { bg: "bg-gradient-to-r from-red-500 to-red-600", text: "text-white", accent: "text-red-200" }
    }
  ];

  return (
    <div className="h-full">
      {/* Top Horizontal Ad */}
      <div className="border-b border-border p-4">
        <div className="max-w-6xl mx-auto">
          <AdBanner
            type="horizontal"
            {...horizontalAds[0]}
          />
        </div>
      </div>

      {/* Email Generation Section */}
      <div className="bg-card border-b border-border p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-primary w-12 h-12 rounded-xl flex items-center justify-center">
                <Mail className="text-primary-foreground w-6 h-6" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-3">NextMailz</h1>
            <p className="text-muted-foreground text-lg">Generate secure temporary email addresses instantly</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            {/* Domain Selection */}
            <div className="mb-4">
              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <SelectTrigger data-testid="select-domain">
                  <SelectValue placeholder="Choose domain (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {domains.map((domain) => (
                    <SelectItem key={domain.id} value={domain.domain}>
                      @{domain.domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Email Display and Generation */}
            <div className="space-y-4">
              {currentEmail ? (
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      type="text"
                      className="pr-12 text-center text-lg font-mono"
                      value={currentEmail.email}
                      readOnly
                      data-testid="input-generated-email"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                      onClick={copyEmail}
                      data-testid="button-copy-email"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Status Bar */}
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Expires in: <span className="font-mono text-foreground">{formatTimeRemaining(timeRemaining)}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={timeRemaining > 300000 ? "default" : "destructive"}>
                        {timeRemaining > 0 ? "Active" : "Expired"}
                      </Badge>
                      {unreadCount > 0 && (
                        <Badge variant="secondary">{unreadCount} new</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No temporary email generated yet</p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={generateNewEmail}
                  disabled={generateEmailMutation.isPending}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  data-testid="button-generate-email"
                >
                  {generateEmailMutation.isPending ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Mail className="w-4 h-4 mr-2" />
                  )}
                  {currentEmail ? "Generate New Email" : "Generate Email"}
                </Button>
                {currentEmail && (
                  <Button
                    variant="outline"
                    onClick={refreshInbox}
                    data-testid="button-refresh-inbox"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Horizontal Ad */}
      <div className="border-b border-border p-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <AdBanner
            type="horizontal"
            {...horizontalAds[1]}
          />
        </div>
      </div>

      {/* Messages Section */}
      {currentEmail && (
        <div className="p-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Sidebar with Vertical Ads */}
              <div className="lg:col-span-1 space-y-4">
                <AdBanner
                  type="vertical"
                  {...verticalAds[0]}
                />
                <AdBanner
                  type="vertical" 
                  {...verticalAds[1]}
                />
              </div>

              {/* Main Inbox Content */}
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-foreground">
                    Inbox {unreadCount > 0 && <span className="text-primary">({unreadCount})</span>}
                  </h2>
                  <Button variant="ghost" size="sm" onClick={refreshInbox}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>

                {messages.length > 0 ? (
                  <div className="space-y-3">
                    {/* Third Horizontal Ad after first 2 messages */}
                    {messages.slice(0, 2).map((message) => (
                      <Card
                        key={message.id}
                        className={`transition-all hover:shadow-md cursor-pointer ${
                          !message.isRead ? "ring-2 ring-primary/20 bg-primary/5" : ""
                        }`}
                        onClick={() => !message.isRead && markAsReadMutation.mutate(message.id)}
                        data-testid={`email-item-${message.id}`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-3 mb-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  !message.isRead 
                                    ? "bg-primary/10 text-primary" 
                                    : "bg-muted text-muted-foreground"
                                }`}>
                                  {getMessageIcon(message.sender)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium text-foreground truncate" data-testid={`text-sender-${message.id}`}>
                                      {message.sender}
                                    </span>
                                    {!message.isRead && (
                                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    )}
                                  </div>
                                  <span className="text-sm text-muted-foreground" data-testid={`text-time-${message.id}`}>
                                    {formatRelativeTime(message.receivedAt)}
                                  </span>
                                </div>
                              </div>
                              
                              <h3 className="font-semibold text-foreground mb-2 line-clamp-1" data-testid={`text-subject-${message.id}`}>
                                {message.subject || "No Subject"}
                              </h3>
                              
                              <p className="text-muted-foreground text-sm line-clamp-2" data-testid={`text-preview-${message.id}`}>
                                {message.body || "No content available"}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {messages.length > 2 && (
                      <>
                        {/* Horizontal Ad in between messages */}
                        <div className="my-6">
                          <AdBanner
                            type="horizontal"
                            {...horizontalAds[2]}
                          />
                        </div>
                        
                        {/* Rest of messages */}
                        {messages.slice(2).map((message, index) => (
                          <>
                            {index === 2 && (
                              <div className="my-6">
                                <AdBanner
                                  type="horizontal"
                                  {...horizontalAds[3]}
                                />
                              </div>
                            )}
                            {index === 4 && (
                              <div className="my-6">
                                <AdBanner
                                  type="horizontal"
                                  {...horizontalAds[4]}
                                />
                              </div>
                            )}
                            <Card
                              key={message.id}
                              className={`transition-all hover:shadow-md cursor-pointer ${
                                !message.isRead ? "ring-2 ring-primary/20 bg-primary/5" : ""
                              }`}
                              onClick={() => !message.isRead && markAsReadMutation.mutate(message.id)}
                              data-testid={`email-item-${message.id}`}
                            >
                              <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center space-x-3 mb-3">
                                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        !message.isRead 
                                          ? "bg-primary/10 text-primary" 
                                          : "bg-muted text-muted-foreground"
                                      }`}>
                                        {getMessageIcon(message.sender)}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-2">
                                          <span className="font-medium text-foreground truncate" data-testid={`text-sender-${message.id}`}>
                                            {message.sender}
                                          </span>
                                          {!message.isRead && (
                                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                                          )}
                                        </div>
                                        <span className="text-sm text-muted-foreground" data-testid={`text-time-${message.id}`}>
                                          {formatRelativeTime(message.receivedAt)}
                                        </span>
                                      </div>
                                    </div>
                                    
                                    <h3 className="font-semibold text-foreground mb-2 line-clamp-1" data-testid={`text-subject-${message.id}`}>
                                      {message.subject || "No Subject"}
                                    </h3>
                                    
                                    <p className="text-muted-foreground text-sm line-clamp-2" data-testid={`text-preview-${message.id}`}>
                                      {message.body || "No content available"}
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </>
                        ))}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                      <Mail className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-medium text-foreground mb-2">No messages yet</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Messages sent to <span className="font-mono text-sm">{currentEmail.email}</span> will appear here automatically.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}