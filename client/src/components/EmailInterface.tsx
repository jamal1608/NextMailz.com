"use client";

import { useState } from "react";
import { RefreshCw, Mail, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// 3D Logo
import Logo3D from "@/components/Logo3D";

const API_BASE = "https://api.mail.tm";

// fetch domains
async function fetchDomains() {
  const res = await fetch(`${API_BASE}/domains`);
  const data = await res.json();
  return data["hydra:member"];
}

// create account
async function createAccount(domain: string) {
  const address = `user${Date.now()}@${domain}`;
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
  return { address, token: tokenData.token };
}

// fetch messages
async function fetchMessages(token: string) {
  const res = await fetch(`${API_BASE}/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data["hydra:member"];
}

export default function EmailInterface() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [account, setAccount] = useState<{ address: string; token: string } | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string>("");

  // fetch domains
  const { data: domains = [] } = useQuery({
    queryKey: ["domains"],
    queryFn: fetchDomains,
  });

  // generate email
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

  // fetch messages
  const { data: messages = [] } = useQuery({
    queryKey: ["messages", account?.address],
    enabled: !!account,
    queryFn: () => fetchMessages(account!.token),
    refetchInterval: 5000,
  });

  // clear email
  const clearEmail = () => {
    setAccount(null);
    toast({ title: "Cleared", description: "Temporary email removed." });
  };

  // copy email
  const copyEmail = async () => {
    if (!account) return;
    await navigator.clipboard.writeText(account.address);
    toast({ title: "Copied", description: "Email copied to clipboard." });
  };

  const unreadCount = messages.filter((m: any) => !m.seen).length;

  // ---------------- Ads Config ----------------
  const horizontalAds = [
    {
      title: "Anonymous Email Generator",
      description: "Get free disposable and secure temporary emails instantly.",
      cta: "Try Free",
      bg: "bg-gradient-to-r from-indigo-500 to-indigo-700",
    },
    {
      title: "Cloud Storage 50GB Free",
      description: "Secure cloud storage with end-to-end encryption.",
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
      description: "Store and secure all your passwords in one place.",
      cta: "Start Trial",
      bg: "bg-gradient-to-b from-green-600 to-emerald-700",
    },
  ];
  // ------------------------------------------------

  return (
    <div className="h-full dark:bg-gray-950 dark:text-gray-100 transition-colors">
      {/* Header */}
      <div className="border-b border-border p-6 bg-card dark:bg-gray-900">
        <div className="max-w-6xl mx-auto flex flex-col items-center space-y-4">
          <Logo3D size={96} />
          <h1 className="text-3xl font-bold">NextMailz</h1>
          <p className="text-muted-foreground text-lg dark:text-gray-400 text-center">
            Free disposable email, temporary email generator, anonymous inbox for privacy protection
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

      {/* Domain Select + Controls */}
      <div className="bg-muted/30 border-b border-border p-6 dark:bg-gray-800">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <select
            className="border p-3 w-full rounded-md dark:bg-gray-900 dark:border-gray-700"
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
          >
            <option value="">Select Domain</option>
            {domains.map((d: any) => (
              <option key={d.id} value={d.domain}>
                {d.domain}
              </option>
            ))}
          </select>

          <div className="flex flex-wrap justify-center gap-3 mt-4">
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

      {/* Layout with Left Ad + Inbox + Right Ad */}
      {account && (
        <div className="p-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-6">
            {/* Left Ad */}
            <div className="lg:col-span-3 space-y-4">
              {verticalAds.slice(0, 1).map((ad, idx) => (
                <div key={idx} className={`p-4 rounded-xl shadow-md text-white ${ad.bg}`}>
                  <h3 className="font-semibold">{ad.title}</h3>
                  <p className="text-sm opacity-90">{ad.description}</p>
                  <Button size="sm" variant="secondary" className="mt-2">
                    {ad.cta}
                  </Button>
                </div>
              ))}
            </div>

            {/* Inbox Center */}
            <div className="lg:col-span-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">
                  Inbox {unreadCount > 0 && <span>({unreadCount})</span>}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => queryClient.invalidateQueries({ queryKey: ["messages"] })}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>

              {messages.length > 0 ? (
                <div className="space-y-3">
                  {messages.map((msg: any) => (
                    <Card
                      key={msg.id}
                      className={`hover:shadow-md transition cursor-pointer dark:bg-gray-900 ${
                        !msg.seen ? "ring-2 ring-primary/20 bg-primary/5" : ""
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between">
                          <div>
                            <div className="font-semibold">{msg.from?.address}</div>
                            <div className="text-sm text-muted-foreground dark:text-gray-400">
                              {msg.subject || "No subject"}
                            </div>
                          </div>
                          {!msg.seen && <Badge variant="secondary">New</Badge>}
                        </div>
                        <p className="text-sm mt-2 text-muted-foreground dark:text-gray-400 line-clamp-2">
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
                  <p className="text-muted-foreground dark:text-gray-400">
                    Messages sent to <span className="font-mono">{account.address}</span> will appear here.
                  </p>
                </div>
              )}
            </div>

            {/* Right Ad */}
            <div className="lg:col-span-3 space-y-4">
              {verticalAds.slice(1, 2).map((ad, idx) => (
                <div key={idx} className={`p-4 rounded-xl shadow-md text-white ${ad.bg}`}>
                  <h3 className="font-semibold">{ad.title}</h3>
                  <p className="text-sm opacity-90">{ad.description}</p>
                  <Button size="sm" variant="secondary" className="mt-2">
                    {ad.cta}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Horizontal Ad */}
      <div className="border-t border-border p-4 bg-muted/20">
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
    </div>
  );
}



