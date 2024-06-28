import { PostType } from "@/types";
import Link from "next/link";

type Props = {
  post: PostType;
};

function BlogCard({ post }: Props) {
  return (
    <div className="border p-3 rounded-lg space-y-2">
      <p className="h-6 text-ellipsis overflow-hidden whitespace-nowrap text-xl font-bold">{post.title}</p>
      <p className="h-18 text-ellipsis overflow-hidden line-clamp-4">{post.body}</p>
      <div className="flex justify-end">
        <Link href="/posts" className="text-primary">
          View More &gt;&gt;
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
