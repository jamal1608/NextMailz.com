import { useParams } from "wouter";
import { posts } from "@/data/posts";
import BlogPost from "@/components/BlogPost";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="max-w-5xl mx-auto py-12 px-4 text-center">
        <h1 className="text-3xl font-bold">Post Not Found</h1>
        <p className="mt-4">The blog post you are looking for does not exist.</p>
      </div>
    );
  }

  return <BlogPost post={post} />;
}

