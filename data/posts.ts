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
    author: "James Smith",
    date: "2025-11-15",
    heroImage: "https://picsum.photos/id/1005/1200/600",
    blocks: [
      { type: "heading", content: "America Loves These Effective Apps to Finish Work Quickly: Increase Attention And Efficiency" },
      { type: "paragraph", content: "Businesses of today are focusing on Digital productivity apps. If you are in need of projects organization, with their free form functionality, or need to organize their day to day activity and just wish to close and work without any distracters there is productivity app that will do the job. You already have lots of productivity apps to choose from, so of course it’ll be hard to determine which one is the best for you. To give you a hand to improve yourselves and simplify your workflow, we’ve listed America’s best productivity apps that assist in bringing one’s productivity to a new level, help you deal better with time and most importantly keep you on track with your goals. To learn more about the productiveness apps that will enable you to work easier, let’s dive deeper.   " },
      { type: "list", content: "Hack 1: Use a timer\nHack 2: Avoid multitasking\nHack 3: Plan your day" },
    ],
    images: ["https://picsum.photos/id/1050/800/400"],
    faqs: [
      { question: "What tools can I use?", answer: "Try Notion, Trello, or Todoist." },
    ],
  },
];
