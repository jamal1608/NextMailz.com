import type { Post } from "../../../shared/types";
import { Link } from "wouter";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition">
      {post.heroImage && (
        <img
          src={post.heroImage}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
        <p className="text-sm text-gray-500 mb-4">
          By {post.author} | {new Date(post.date || "").toLocaleDateString()}
        </p>
        <Link href={`/blog/${post.id}`}>
          <a className="inline-block text-blue-600 hover:underline font-medium">
            Read More →
          </a>
        </Link>
      </div>
    </div>
  );
}
