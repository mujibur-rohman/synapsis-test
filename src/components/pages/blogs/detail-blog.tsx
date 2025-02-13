import CommentList from "@/components/element/comment-list";
import Wrapper from "@/components/element/wrapper";
import PostService from "@/services/post.service";
import { notFound } from "next/navigation";

type PropsComponent = {
  params: { blogId: string };
};

async function DetailBlog({ params }: PropsComponent) {
  // read route params
  const blogId = params.blogId;

  // fetch data
  const blog = await PostService.getOne(+blogId);

  if (!blog) {
    notFound();
  }

  return (
    <Wrapper className="py-8">
      <p className="text-xl font-bold">Title</p>
      <p>{blog.data.body}</p>
      <div className="my-5">
        <p className="border-b pb-2 font-semibold text-lg">Comments</p>
        <CommentList postId={blog.data.id} />
      </div>
    </Wrapper>
  );
}

export default DetailBlog;
