"use client";
import { userSchema } from "@/scemas/user.schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import errorResponse from "@/utils/error-response";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/utils/clsx";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { StatusUser } from "@/enum";
import UserService from "@/services/user.service";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { UserType } from "@/types";

type Props = {
  user?: UserType;
};

function FormUser({ user }: Props) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      gender: user?.gender || "",
      status: user?.status || "",
    },
  });

  async function onSubmit(values: z.infer<typeof userSchema>) {
    try {
      if (!user) {
        await UserService.add(values);
        toast.success("Add User Successfully!");
      } else {
        await UserService.update(user.id, values);
        toast.success("Update User Successfully!");
        queryClient.invalidateQueries({ queryKey: ["user", user.id] });
      }
      queryClient.invalidateQueries({ queryKey: ["users", page] });
      router.push("/users");
    } catch (error: any) {
      errorResponse(error);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 lg:border-none border-b pb-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    className={cn({
                      "border-destructive": form.formState.errors.name,
                    })}
                    placeholder="Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className={cn({
                      "border-destructive": form.formState.errors.email,
                    })}
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"male"}>Male</SelectItem>
                    <SelectItem value={"female"}>Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={StatusUser.ACTIVE}>Active</SelectItem>
                    <SelectItem value={StatusUser.INACTIVE}>Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={form.formState.isSubmitting} type="submit" className="!mt-4">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default FormUser;
