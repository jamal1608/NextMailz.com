import type { Post } from "../../../shared/types";

interface BlogPostProps {
  post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
  const renderBlock = (block: { type: string; content: string }, idx: number) => {
    if (block.type === "heading") {
      const id = block.content.toLowerCase().replace(/\s+/g, "-");
      return (
        <h2 id={id} key={idx} className="mt-8 mb-4 font-semibold text-2xl">
          {block.content}
        </h2>
      );
    }

    if (block.type === "list") {
      const items = block.content.split("\n");
      return (
        <ul key={idx} className="list-disc ml-6 mb-4">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    }

    return <p key={idx} className="mb-4">{block.content}</p>;
  };

  return (
    <article className="prose prose-lg max-w-3xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        By {post.author} | {new Date(post.date || "").toLocaleDateString()}
      </p>

      {post.heroImage && (
        <figure className="mb-6">
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full rounded-lg shadow-md"
          />
        </figure>
      )}

      {post.blocks.map((block, idx) => renderBlock(block, idx))}

      {post.images?.map((img, idx) => (
        <figure key={idx} className="my-6">
          <img src={img} alt={`Image ${idx + 1}`} className="w-full rounded-lg shadow-md" />
        </figure>
      ))}

      {post.faqs?.length ? (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4">FAQ</h2>
          {post.faqs.map((faq, idx) => (
            <details key={idx} className="mb-2 p-4 border rounded-lg">
              <summary className="font-semibold cursor-pointer">{faq.question}</summary>
              <p className="mt-2">{faq.answer}</p>
            </details>
          ))}
        </section>
      ) : null}
    </article>
  );
}
