// index.tsx
import { posts } from "../../../../data/posts";
import BlogCard from "../../components/BlogCard";

export default function BlogIndex() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

