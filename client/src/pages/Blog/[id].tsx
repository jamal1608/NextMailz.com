import { useParams } from "wouter";

import { posts } from "../../../../data/posts";
import BlogPost from "../../components/BlogPost";


export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <p className="text-red-600 text-lg font-semibold">❌ Post not found</p>
      </div>
    );
  }

  return <BlogPost post={post} />;
}
