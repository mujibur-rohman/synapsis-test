"use client";
import { Button } from "@/components/button";
import ErrorRender from "@/components/element/error-render";
import UserCard from "@/components/element/user-card";
import Wrapper from "@/components/element/wrapper";
import { InputSearch } from "@/components/input-search";
import Paginate from "@/components/paginate";
import { Skeleton } from "@/components/skeleton";
import { useDebounce } from "@/hooks/useDebounce";
import UserService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

function UserPage() {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce<string>(search, 300);
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const pathname = usePathname();
  const { push } = useRouter();

  const {
    data: users,
    isLoading,
    refetch,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["users", page, debouncedSearch],
    queryFn: async () => {
      return await UserService.getAll({ page: +page, per_page: 5, name: debouncedSearch });
    },
  });

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    push(`${pathname}?${params.toString()}`);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    const params = new URLSearchParams(searchParams);
    params.delete("page");
    push(`${pathname}?${params.toString()}`);
  };

  return (
    <Wrapper className="py-5 space-y-3">
      <div className="flex justify-between">
        <p className="text-xl font-medium flex-grow">User</p>
        <Button asChild variant="outline">
          <Link href="/users/add">Add User</Link>
        </Button>
      </div>
      <div className="flex justify-end">
        <InputSearch className="w-full lg:w-[280px]" value={search} onChange={handleChange} />
      </div>
      {isLoading ? (
        <div className="space-y-2">
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
      ) : users?.meta?.pagination.total === 0 ? (
        <div className="flex justify-center">
          <div className="text-center space-y-2">
            <p>Empty</p>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {users?.data.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
          <div className="mt-5 flex justify-center">
            <Paginate currentPage={parseInt(page)} handlePageChange={handlePageChange} totalPages={users?.meta?.pagination.pages} visiblePage={3} />
          </div>
        </>
      )}
    </Wrapper>
  );
}

export default UserPage;
