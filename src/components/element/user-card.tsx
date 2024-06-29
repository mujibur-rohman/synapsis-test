import { StatusUser } from "@/enum";
import { UserType } from "@/types";
import { cn } from "@/utils/clsx";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Edit3Icon, EllipsisVerticalIcon, Loader2Icon, TrashIcon } from "lucide-react";
import UserService from "@/services/user.service";
import { toast } from "sonner";
import errorResponse from "@/utils/error-response";

type Props = {
  user: UserType;
};

function UserCard({ user }: Props) {
  const [isLoading, setLoading] = useState(false);
  const [isOpenDialog, setOpenDialog] = useState(false);
  const [typeAction, setTypeAction] = useState<"edit" | "delete" | null>(null);
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page") ?? "1";

  const openChangeWrapper = (value: boolean) => {
    setOpenDialog(value);
  };

  const renderAction = () => {
    return (
      <>
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
          <DialogDescription>Are you sure?</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col md:flex-row gap-3 md:gap-0">
          <DialogClose asChild>
            <Button variant="secondary" className="w-20 text-foreground" size="sm">
              Batal
            </Button>
          </DialogClose>
          <Button
            className="w-20"
            disabled={isLoading}
            onClick={async () => {
              try {
                setLoading(true);
                await UserService.delete(user.id);
                toast.success("Delete Successfully!");
                queryClient.invalidateQueries({ queryKey: ["users", page] });
                queryClient.invalidateQueries({ queryKey: ["users"] });
                setOpenDialog(false);
              } catch (error: any) {
                errorResponse(error);
              } finally {
                setLoading(false);
              }
            }}
            size="sm"
          >
            {isLoading ? <Loader2Icon className="animate-spin" /> : "Yes"}
          </Button>
        </DialogFooter>
      </>
    );
  };

  return (
    <div className="flex justify-between items-center p-3 rounded-lg border">
      <div className="space-y-1">
        <p className="font-bold">{user.name}</p>
        <p className="capitalize text-sm text-gray-400">{user.gender}</p>
      </div>
      <div className="flex gap-3">
        <div className="flex gap-3 items-center capitalize">
          <div
            className={cn("rounded-full px-4 py-1 text-xs font-semibold", {
              "bg-green-100 text-green-500": user.status === StatusUser.ACTIVE,
              "bg-red-100 text-red-500": user.status === StatusUser.INACTIVE,
            })}
          >
            {user.status}
          </div>
        </div>
        <Dialog open={isOpenDialog} onOpenChange={openChangeWrapper}>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <EllipsisVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  router.push(`/users/edit/${user.id}`);
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <Edit3Icon className="w-4 h-4 text-foreground" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOpenDialog(true);
                  setTypeAction("delete");
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <TrashIcon className="w-4 h-4 text-foreground" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className={cn("sm:max-w-[425px]")}>{renderAction()}</DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default UserCard;
