"use client";

import { useState } from "react";
import { RefreshCw, Mail, AlertCircle, Sun, Moon } from "lucide-react";
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

  // theme state
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

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

  return (
    <div className="h-full dark:bg-gray-950 dark:text-gray-100 transition-colors">
      {/* Header */}
      <header className="border-b border-border p-4 bg-card dark:bg-gray-900">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo Left */}
          <div className="flex items-center gap-2">
            <Logo3D size={48} />
            <h1 className="text-2xl font-bold">NextMailz</h1>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border dark:border-gray-700"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* Domain select + Controls */}
      <section className="bg-muted/30 border-b border-border p-6 dark:bg-gray-800">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          {/* Domain Dropdown */}
          <select
            className="w-full md:w-80 px-4 py-3 rounded-lg text-lg font-medium border bg-white dark:bg-gray-900 dark:border-gray-700 focus:ring-2 focus:ring-primary"
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

          {/* Action Buttons */}
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
                onClick={() =>
                  queryClient.invalidateQueries({ queryKey: ["messages"] })
                }
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Email Info */}
      {account ? (
        <div className="max-w-2xl mx-auto mt-6 text-center space-y-4 px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2">
            <Input
              value={account.address}
              readOnly
              className="text-center font-mono dark:bg-gray-900 dark:border-gray-700"
            />
            <Button variant="secondary" onClick={copyEmail}>
              Copy
            </Button>
            <Button variant="destructive" onClick={clearEmail}>
              Delete
            </Button>
          </div>
          <div>
            <Badge variant="default">Active</Badge>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount} new
              </Badge>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground dark:text-gray-400">
            No temporary email generated yet
          </p>
        </div>
      )}

      {/* Inbox */}
      {account && (
        <section className="max-w-6xl mx-auto mt-8 px-4">
          <h2 className="text-xl font-semibold mb-4">
            Inbox {unreadCount > 0 && <span>({unreadCount})</span>}
          </h2>

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
                    <p className="text-sm mt-2 line-clamp-2 dark:text-gray-400">
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
                Messages sent to{" "}
                <span className="font-mono">{account.address}</span> will appear here.
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
