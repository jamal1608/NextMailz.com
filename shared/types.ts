export interface Block {
  type: "heading" | "paragraph" | "list";
  content: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Post {
  id: string;
  title: string;
  heroImage?: string;
  description?: string;
  author?: string;
  date?: string;
  blocks: Block[];
  images?: string[];
  faqs?: FAQ[];
}
