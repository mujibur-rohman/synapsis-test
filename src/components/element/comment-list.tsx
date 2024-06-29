"use client";

import PostService from "@/services/post.service";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../skeleton";
import ErrorRender from "./error-render";

type Props = {
  postId: number;
};

function CommentList({ postId }: Props) {
  const {
    data: comments,
    isLoading,
    refetch,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["comments", postId],
    enabled: !!postId,
    queryFn: async () => {
      return await PostService.getComments(postId);
    },
  });

  return (
    <div className="py-5">
      {isLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : isError && !isFetching ? (
        <ErrorRender refetch={refetch} />
      ) : comments?.meta?.pagination.total === 0 ? (
        <div className="flex justify-center">
          <div className="text-center space-y-2">
            <p>No comment</p>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {comments?.data.map((comment) => (
              <div key={comment.id} className="bg-gray-100 p-3 rounded-lg">
                <p className="font-bold text-primary">{comment.name}</p>
                <p>{comment.body}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default CommentList;
