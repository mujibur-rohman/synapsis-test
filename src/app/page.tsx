"use client";
import Wrapper from "@/components/element/wrapper";
import { useQuery } from "@tanstack/react-query";
import PostService from "../services/post.service";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Paginate from "@/components/paginate";
import ErrorRender from "@/components/element/error-render";
import BlogCard from "@/components/element/blog-card";
import { Skeleton } from "@/components/skeleton";

export default function Home() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const pathname = usePathname();
  const { push } = useRouter();

  const {
    data: posts,
    isLoading,
    refetch,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["posts", page],
    queryFn: async () => {
      return await PostService.getAll({ page: +page, per_page: 6 });
    },
  });

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    push(`${pathname}?${params.toString()}`);
  };

  return (
    <Wrapper className="py-5 space-y-3">
      <div>
        <span className="text-xl font-medium">Blogs</span>
      </div>

      {isLoading ? (
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : isError && !isFetching ? (
        <ErrorRender refetch={refetch} />
      ) : posts?.totalData === 0 ? (
        <div className="flex justify-center">
          <div className="text-center space-y-2">
            <p>Data Kosong</p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
            {posts?.data.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          <div className="mt-5 flex justify-center">
            <Paginate currentPage={parseInt(page)} handlePageChange={handlePageChange} totalPages={posts?.totalPages} visiblePage={3} />
          </div>
        </>
      )}
    </Wrapper>
  );
}
