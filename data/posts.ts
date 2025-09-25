import type { Post } from "../shared/types";

export const posts: Post[] = [
  {
    id: "getting-started",
    title: "Getting Started with Our Platform",
    description: "Learn how to begin your journey with our platform in a few simple steps.",
    author: "Admin",
    date: "2025-09-20",
    heroImage: "https://picsum.photos/id/1018/1200/600",
    blocks: [
      { type: "heading", content: "Introduction" },
      { type: "paragraph", content: "Welcome to our platform! Here’s how to get started." },
      { type: "list", content: "Step 1: Sign up\nStep 2: Verify your email\nStep 3: Log in" },
    ],
    images: [
      "https://picsum.photos/id/1025/800/400",
      "https://picsum.photos/id/1039/800/400",
    ],
    faqs: [
      { question: "Is this platform free?", answer: "Yes, core features are free." },
      { question: "How do I reset my password?", answer: "Click 'Forgot Password' on login page." },
    ],
  },
  {
    id: "productivity-hacks",
    title: "Top 5 Productivity Hacks for 2025",
    description: "Boost your productivity with these simple yet powerful hacks.",
    author: "Jane Doe",
    date: "2025-09-15",
    heroImage: "https://picsum.photos/id/1005/1200/600",
    blocks: [
      { type: "heading", content: "Why Productivity Matters" },
      { type: "paragraph", content: "In today’s fast-paced world, staying productive is the key to success." },
      { type: "list", content: "Hack 1: Use a timer\nHack 2: Avoid multitasking\nHack 3: Plan your day" },
    ],
    images: ["https://picsum.photos/id/1050/800/400"],
    faqs: [
      { question: "What tools can I use?", answer: "Try Notion, Trello, or Todoist." },
    ],
  },
];
