import PostService from "@/services/post.service";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export { default } from "@/components/pages/blogs/detail-blog";

type PropsMetaData = {
  params: { blogId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata({ params }: PropsMetaData): Promise<Metadata> {
  // read route params
  const blogId = params.blogId;

  // fetch data
  const blog = await PostService.getOne(+blogId);

  if (!blog) {
    notFound();
  }

  // Dynamic metadata
  return {
    title: blog.data.title,
    description: blog.data.body,
  };
}
