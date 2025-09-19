import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, RefreshCw, Copy, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// 🔹 Fetch available domains
const fetchDomains = async () => {
  const res = await fetch("https://api.mail.tm/domains");
  const data = await res.json();
  return data["hydra:member"];
};

// 🔹 Create account + login to get token
const createAccount = async (domain: string) => {
  const address = `user${Date.now()}@${domain}`;
  const password = "SuperSecret123!";

  // Create account
  await fetch("https://api.mail.tm/accounts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address, password }),
  });

  // Get token
  const tokenRes = await fetch("https://api.mail.tm/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address, password }),
  });
  const tokenData = await tokenRes.json();

  return { address, token: tokenData.token };
};

// 🔹 Fetch messages for logged-in account
const fetchMessages = async (token: string) => {
  const res = await fetch("https://api.mail.tm/messages", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  return data["hydra:member"];
};

export default function EmailInterface() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [account, setAccount] = useState<{ address: string; token: string } | null>(null);

  // Mutation: generate new email
  const generateEmailMutation = useMutation({
    mutationFn: async () => {
      const domains = await fetchDomains();
      const domain = domains[0].domain;
      return await createAccount(domain);
    },
    onSuccess: (data) => {
      setAccount(data);
      toast({
        title: "Email Generated!",
        description: `Your temporary email: ${data.address}`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Could not generate email. Try again.",
        variant: "destructive",
      });
    },
  });

  // Query: fetch messages
  const { data: messages = [], refetch } = useQuery({
    queryKey: ["messages", account?.address],
    enabled: !!account,
    queryFn: () => fetchMessages(account!.token),
    refetchInterval: 5000, // poll every 5s
  });

  // Copy email to clipboard
  const copyEmail = async () => {
    if (!account) return;
    await navigator.clipboard.writeText(account.address);
    toast({ title: "Copied!", description: "Email copied to clipboard." });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">NextMailz (mail.tm)</h1>

      {/* Email Generator */}
      <div className="mb-6">
        {account ? (
          <div className="flex items-center space-x-3">
            <Input value={account.address} readOnly className="font-mono" />
            <Button onClick={copyEmail}>
              <Copy className="w-4 h-4 mr-2" /> Copy
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => generateEmailMutation.mutate()}
            disabled={generateEmailMutation.isPending}
            className="bg-primary text-white"
          >
            {generateEmailMutation.isPending ? (
              <RefreshCw className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Mail className="w-4 h-4 mr-2" />
            )}
            Generate Email
          </Button>
        )}
      </div>

      {/* Refresh */}
      {account && (
        <Button variant="outline" onClick={() => refetch()} className="mb-6">
          <RefreshCw className="w-4 h-4 mr-2" /> Refresh Inbox
        </Button>
      )}

      {/* Messages */}
      {account ? (
        messages.length > 0 ? (
          <div className="space-y-3">
            {messages.map((msg: any) => (
              <Card key={msg.id} className="hover:shadow-md transition">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{msg.subject || "No Subject"}</h3>
                      <p className="text-sm text-muted-foreground">{msg.intro || "No preview"}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        From: {msg.from?.address} | {new Date(msg.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No messages yet. Send an email to {account.address}</p>
        )
      ) : (
        <p className="text-muted-foreground">Generate an email to start receiving messages.</p>
      )}
    </div>
  );
}