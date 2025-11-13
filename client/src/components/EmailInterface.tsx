import { useState, useEffect } from "react";
import { Copy, RefreshCw, Trash2, Mail, AlertCircle, ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// 3D Logo
import Logo3D from "@/components/Logo3D";

const API_BASE = "https://api.mail.tm";

// ---------------------- Helper: Random Username ---------------------- //
function generateRandomUsername(length = 10) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// ---------------------- Timer Component ---------------------- //
function CountdownTimer({ expiryTime }: { expiryTime: number }) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.floor((expiryTime - Date.now()) / 1000));
      setTimeLeft(remaining);
      
      if (remaining === 0) {
        clearInterval(interval);
        localStorage.removeItem('tempEmail');
        window.location.reload();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryTime]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center gap-2 text-sm">
      <Clock className="w-4 h-4" />
      <span className="font-mono">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
}

// ---------------------- API Helpers ---------------------- //
async function fetchDomains() {
  const res = await fetch(`${API_BASE}/domains`);
  const data = await res.json();
  return data["hydra:member"];
}

async function createAccount(domain: string) {
  const username = generateRandomUsername(8);
  const address = `${username}@${domain}`;
  const password = "SuperSecret123!";

  await fetch(`${API_BASE}/accounts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address, password }),
  });

  const tokenRes = await fetch(`${API_BASE}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address, password }),
  });

  const tokenData = await tokenRes.json();
  return { 
    address, 
    token: tokenData.token,
    expiryTime: Date.now() + (10 * 60 * 1000) // 10 minutes from now
  };
}

async function fetchMessages(token: string) {
  const res = await fetch(`${API_BASE}/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data["hydra:member"];
}

async function fetchMessageDetail(id: string, token: string) {
  const res = await fetch(`${API_BASE}/messages/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return await res.json();
}

// ---------------------- Ads Config ---------------------- //
const horizontalAds = [
  {
    title: "Email Security Scanner",
    description: "Scan your emails for threats and phishing attempts automatically.",
    cta: "Try Free",
    bg: "bg-gradient-to-r from-indigo-500 to-indigo-700",
  },
  {
    title: "Cloud Storage 50GB Free",
    description: "Secure cloud storage with end-to-end encryption and privacy first.",
    cta: "Sign Up",
    bg: "bg-gradient-to-r from-orange-500 to-red-500",
  },
];

const verticalAds = [
  {
    title: "VPN Service",
    description: "Protect your online privacy with military-grade encryption.",
    cta: "Get VPN",
    bg: "bg-gradient-to-b from-blue-600 to-blue-800",
  },
  {
    title: "Password Manager",
    description: "Store and secure all your passwords in one place with ease.",
    cta: "Start Trial",
    bg: "bg-gradient-to-b from-green-600 to-emerald-700",
  },
];

// ---------------------- Main Component ---------------------- //
export default function EmailInterface() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [account, setAccount] = useState<{ address: string; token: string; expiryTime: number } | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [selectedDomain, setSelectedDomain] = useState<string>("");

  // Load account from localStorage on mount
  useEffect(() => {
    const savedAccount = localStorage.getItem('tempEmail');
    if (savedAccount) {
      try {
        const parsed = JSON.parse(savedAccount);
        // Check if email hasn't expired
        if (parsed.expiryTime && parsed.expiryTime > Date.now()) {
          setAccount(parsed);
        } else {
          localStorage.removeItem('tempEmail');
        }
      } catch (error) {
        console.error('Error loading saved email:', error);
        localStorage.removeItem('tempEmail');
      }
    }
  }, []);

  // Save account to localStorage whenever it changes
  useEffect(() => {
    if (account) {
      localStorage.setItem('tempEmail', JSON.stringify(account));
    }
  }, [account]);

  // fetch available domains
  const { data: domains = [] } = useQuery({
    queryKey: ["domains"],
    queryFn: fetchDomains,
  });

  // generate new account
  const generateEmailMutation = useMutation({
    mutationFn: async () => {
      if (!selectedDomain) throw new Error("Select a domain first!");
      return await createAccount(selectedDomain);
    },
    onSuccess: (data) => {
      setAccount(data);
      toast({
        title: "Email Generated!",
        description: `Your temporary email: ${data.address}`,
      });
    },
  });

  // poll messages
  const { data: messages = [] } = useQuery({
    queryKey: ["messages", account?.address],
    enabled: !!account,
    queryFn: () => fetchMessages(account!.token),
    refetchInterval: 5000,
  });

  // clear email
  const clearEmail = () => {
    setAccount(null);
    setSelectedMessage(null);
    localStorage.removeItem('tempEmail');
    toast({ title: "Cleared", description: "Temporary email removed." });
  };

  // copy email
  const copyEmail = async () => {
    if (!account) return;
    await navigator.clipboard.writeText(account.address);
    toast({ title: "Copied", description: "Email copied to clipboard." });
  };

  const unreadCount = messages.filter((m: any) => !m.seen).length;

  return (
    <div className="h-full">
      {/* Header */}
      <div className="border-b border-border p-6 bg-card">
        <div className="max-w-6xl mx-auto flex flex-col items-center space-y-4">
          <Logo3D size={96} />
          <h1 className="text-3xl font-bold">NextMailz</h1>
          <p className="text-muted-foreground text-lg text-center">
            Temporary 10-minute email for privacy, anonymity, and secure communication.
          </p>
        </div>
      </div>

      {/* Top Horizontal Ad */}
      <div className="border-b border-border p-4">
        <div className="max-w-6xl mx-auto">
          <div className={`p-4 rounded-xl shadow-md text-white ${horizontalAds[0].bg}`}>
            <h3 className="font-semibold">{horizontalAds[0].title}</h3>
            <p className="text-sm opacity-90">{horizontalAds[0].description}</p>
            <Button size="sm" variant="secondary" className="mt-2">
              {horizontalAds[0].cta}
            </Button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-muted/30 border-b border-border p-6">
        <div className="max-w-2xl mx-auto space-y-6 text-center">
          {/* Domain Dropdown */}
          <select
            className="border p-3 rounded-lg dark:bg-gray-900 dark:border-gray-700 w-full max-w-sm mx-auto text-lg"
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            disabled={!!account}
          >
            <option value="">Select Domain</option>
            {domains.map((d: any) => (
              <option key={d.id} value={d.domain}>
                {d.domain}
              </option>
            ))}
          </select>

          {/* Show Email */}
          {account ? (
            <>
              <div className="relative">
                <Input
                  value={account.address}
                  readOnly
                  className="pr-28 text-center text-lg font-mono"
                />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-2">
                  <Button onClick={copyEmail} size="sm">Copy</Button>
                  <Button variant="destructive" onClick={clearEmail} size="sm">
                    Delete
                  </Button>
                </div>
              </div>
              <div className="flex justify-center gap-3 flex-wrap">
                <Badge variant="default">Active</Badge>
                {unreadCount > 0 && <Badge variant="secondary">{unreadCount} new</Badge>}
                <Badge variant="outline" className="px-3 py-1">
                  <CountdownTimer expiryTime={account.expiryTime} />
                </Badge>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No temporary email generated yet</p>
              <p className="text-sm text-muted-foreground mt-2">Email expires after 10 minutes</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              onClick={() => generateEmailMutation.mutate()}
              disabled={generateEmailMutation.isPending || !selectedDomain}
            >
              <Mail className="w-4 h-4 mr-2" />
              {account ? "Generate New Email" : "Generate Email"}
            </Button>
            {account && (
              <Button
                variant="outline"
                onClick={() => queryClient.invalidateQueries({ queryKey: ["messages"] })}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Second Horizontal Ad */}
      <div className="border-b border-border p-4 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className={`p-4 rounded-xl shadow-md text-white ${horizontalAds[1].bg}`}>
            <h3 className="font-semibold">{horizontalAds[1].title}</h3>
            <p className="text-sm opacity-90">{horizontalAds[1].description}</p>
            <Button size="sm" variant="secondary" className="mt-2">
              {horizontalAds[1].cta}
            </Button>
          </div>
        </div>
      </div>

      {/* Inbox + Vertical Ads */}
      {account && (
        <div className="p-6">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-6">
            {/* Left Sidebar Ad */}
            <div className="space-y-4 hidden lg:block">
              <div className={`p-4 rounded-xl shadow-md text-white ${verticalAds[0].bg}`}>
                <h3 className="font-semibold">{verticalAds[0].title}</h3>
                <p className="text-sm opacity-90">{verticalAds[0].description}</p>
                <Button size="sm" variant="secondary" className="mt-2">
                  {verticalAds[0].cta}
                </Button>
              </div>
            </div>

            {/* Inbox */}
            <div className="lg:col-span-3">
              {!selectedMessage ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold">
                      Inbox {unreadCount > 0 && <span>({unreadCount})</span>}
                    </h2>
                  </div>

                  {messages.length > 0 ? (
                    <div className="space-y-3">
                      {messages.map((msg: any) => (
                        <Card
                          key={msg.id}
                          className={`hover:shadow-md transition cursor-pointer ${
                            !msg.seen ? "ring-2 ring-primary/20 bg-primary/5" : ""
                          }`}
                          onClick={async () => {
                            const detail = await fetchMessageDetail(msg.id, account.token);
                            setSelectedMessage(detail);
                          }}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between">
                              <div>
                                <div className="font-semibold">{msg.from?.address}</div>
                                <div className="text-sm text-muted-foreground">
                                  {msg.subject || "No subject"}
                                </div>
                              </div>
                              {!msg.seen && <Badge variant="secondary">New</Badge>}
                            </div>
                            <p className="text-sm mt-2 text-muted-foreground line-clamp-2">
                              {msg.intro || "No content"}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <Mail className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                      <h3 className="text-lg font-medium">No messages yet</h3>
                      <p className="text-muted-foreground">
                        Messages sent to{" "}
                        <span className="font-mono">{account.address}</span> will appear here.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mb-4"
                    onClick={() => setSelectedMessage(null)}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Inbox
                  </Button>
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {selectedMessage.subject || "No subject"}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      From: {selectedMessage.from?.address}
                    </p>
                    <div
                      className="prose max-w-none dark:prose-invert"
                      dangerouslySetInnerHTML={{
                        __html: selectedMessage.html || "<p>No content</p>",
                      }}
                    />
                  </Card>
                </div>
              )}
            </div>

            {/* Right Sidebar Ad */}
            <div className="space-y-4 hidden lg:block">
              <div className={`p-4 rounded-xl shadow-md text-white ${verticalAds[1].bg}`}>
                <h3 className="font-semibold">{verticalAds[1].title}</h3>
                <p className="text-sm opacity-90">{verticalAds[1].description}</p>
                <Button size="sm" variant="secondary" className="mt-2">
                  {verticalAds[1].cta}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}