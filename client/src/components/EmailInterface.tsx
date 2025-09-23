"use client";

import { useState } from "react";
import { Copy, RefreshCw, Trash2, Mail, AlertCircle, ArrowLeft } from "lucide-react";
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

// ---------------------- API Helpers ---------------------- //
async function fetchDomains() {
  const res = await fetch(`${API_BASE}/domains`);
  const data = await res.json();
  return data["hydra:member"];
}

async function createAccount(domain: string) {
  const username = generateRandomUsername(8); // ✅ random user
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
  return { address, token: tokenData.token };
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

async function markMessageRead(id: string, token: string) {
  await fetch(`${API_BASE}/messages/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ seen: true }),
  });
}

// ---------------------- Main Component ---------------------- //
export default function EmailInterface() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [account, setAccount] = useState<{ address: string; token: string } | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [selectedDomain, setSelectedDomain] = useState<string>("");

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
      {/* Header with 3D Logo and SEO-friendly text */}
      <div className="border-b border-border p-6 bg-card">
        <div className="max-w-6xl mx-auto flex flex-col items-center space-y-4">
          <Logo3D size={96} />
          <h1 className="text-3xl font-bold">NextMailz</h1>
          <p className="text-muted-foreground text-lg">
            Temporary email service for privacy, anonymity, and secure communication.
          </p>
        </div>
      </div>

      {/* Email Controls with Domain Selection */}
      <div className="bg-muted/30 border-b border-border p-6">
        <div className="max-w-2xl mx-auto space-y-4 text-center">
          {/* Domain Dropdown */}
          <select
            className="border p-2 rounded-md dark:bg-gray-900 dark:border-gray-700 w-full max-w-xs mx-auto"
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

          {/* Email Display */}
          {account ? (
            <>
              <div className="relative">
                <Input
                  value={account.address}
                  readOnly
                  className="pr-28 text-center text-lg font-mono"
                />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-2">
                  <Button onClick={copyEmail}>Copy</Button>
                  <Button variant="destructive" onClick={clearEmail}>
                    Delete
                  </Button>
                </div>
              </div>
              <div className="flex justify-center gap-3">
                <Badge variant="default">Active</Badge>
                {unreadCount > 0 && (
                  <Badge variant="secondary">{unreadCount} new</Badge>
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No temporary email generated yet</p>
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

      {/* Inbox */}
      {account && (
        <div className="p-6 max-w-6xl mx-auto">
          {!selectedMessage ? (
            <>
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
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: selectedMessage.html || "<p>No content</p>",
                  }}
                />
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
}







