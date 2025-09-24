"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BlogPostProps {
  title: string;
  description: string;
  date: string;
  author: string;
  images: string[];
  blocks: string[];
  faqs?: { question: string; answer: string }[];
}

export default function BlogPost({ title, description, date, author, images, blocks, faqs }: BlogPostProps) {
  const [tocItems, setTocItems] = useState<{ text: string; id: string; level: number }[]>([]);

  useEffect(() => {
    const items: { text: string; id: string; level: number }[] = [];
    blocks.forEach((block) => {
      const match = block.match(/^(#{2,3})\s*(.+)$/); // only h2 & h3
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = text.toLowerCase().replace(/\s+/g, "-");
        items.push({ text, id, level });
      }
    });
    setTocItems(items);
  }, [blocks]);

  const renderBlock = (block: string, idx: number) => {
    // Headings
    const headingMatch = block.match(/^(#{1,6})\s*(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      const id = text.toLowerCase().replace(/\s+/g, "-");
      const Tag = `h${level}` as keyof JSX.IntrinsicElements;
      return (
        <Tag id={id} key={idx} className={`scroll-mt-20 mt-8 mb-4 font-semibold ${level === 2 ? "text-2xl" : "text-xl"}`}>
          {text}
        </Tag>
      );
    }

    // Unordered list
    if (block.startsWith("- ")) {
      const items = block.split("\n").map((line) => line.replace(/^- /, "").trim());
      return (
        <ul key={idx} className="list-disc ml-6 mb-4">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    }

    // Ordered list
    if (block.match(/^\d+\.\s/)) {
      const items = block.split("\n").map((line) => line.replace(/^\d+\.\s/, "").trim());
      return (
        <ol key={idx} className="list-decimal ml-6 mb-4">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
    }

    // Paragraph
    return <p key={idx} className="mb-4">{block}</p>;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-4 lg:px-24 py-8">
      {/* Main content */}
      <div className="flex-1 prose prose-lg">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p className="text-sm text-gray-500 mb-6">
          By {author} | {new Date(date).toLocaleDateString()}
        </p>

        {/* Hero image */}
        {images[0] && (
          <figure className="mb-6">
            <img src={images[0]} alt={`Hero image for ${title}`} className="w-full rounded-lg shadow-md" loading="lazy" />
            <figcaption className="text-sm text-gray-500 mt-2">Hero Image</figcaption>
          </figure>
        )}

        {/* Content blocks */}
        {blocks.map((block, idx) => renderBlock(block, idx))}

        {/* Inline additional images */}
        {images.slice(1).map((img, idx) => (
          <figure key={idx} className="my-6">
            <img src={img} alt={`Image ${idx + 2} for ${title}`} className="w-full rounded-lg shadow-md" loading="lazy" />
            <figcaption className="text-sm text-gray-500 mt-2">Image {idx + 2}</figcaption>
          </figure>
        ))}

        {/* FAQ Section */}
        {faqs && faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">FAQ</h2>
            {faqs.map((faq, idx) => (
              <details key={idx} className="mb-2 p-4 border rounded-lg">
                <summary className="font-semibold cursor-pointer">{faq.question}</summary>
                <p className="mt-2">{faq.answer}</p>
              </details>
            ))}
          </section>
        )}
      </div>

      {/* Table of Contents */}
      {tocItems.length > 0 && (
        <aside className="hidden lg:block w-64 sticky top-24 self-start prose prose-sm">
          <h2 className="font-bold mb-2">Table of Contents</h2>
          <ul>
            {tocItems.map((item, idx) => (
              <li key={idx} className={`ml-${(item.level - 2) * 4}`}>
                <a href={`#${item.id}`} className="text-blue-600 hover:underline">
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  );
}
