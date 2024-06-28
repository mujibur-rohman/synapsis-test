"use client";

import ErrorRender from "@/components/element/error-render";
import Wrapper from "@/components/element/wrapper";
import FormUser from "@/components/form/form-user";
import { Skeleton } from "@/components/skeleton";
import UserService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

function FormEditUserPage() {
  const { userId } = useParams();
  const {
    data: user,
    isLoading,
    refetch,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["user", +userId],
    queryFn: async () => {
      return await UserService.getOne(+userId);
    },
  });

  return (
    <Wrapper className="py-5 space-y-3">
      <div>
        <span className="text-xl font-medium">Edit User</span>
      </div>
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : isError && !isFetching ? (
        <ErrorRender refetch={refetch} />
      ) : !user?.data ? (
        <div className="flex justify-center">
          <div className="text-center space-y-2">
            <p>Not found</p>
          </div>
        </div>
      ) : (
        <FormUser user={user.data} />
      )}
    </Wrapper>
  );
}

export default FormEditUserPage;
