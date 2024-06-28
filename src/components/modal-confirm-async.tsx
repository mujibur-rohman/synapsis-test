"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/dialog";
import * as React from "react";
import { Button } from "./button";

type ModalConfirmAsyncProps = {
  children: React.ReactNode;
  onConfirm: () => Promise<void>;
  title: string;
  description?: string;
};

function ModalConfirmAsync({ children, onConfirm, title, description }: ModalConfirmAsyncProps) {
  const [isOpenDialog, setOpenDialog] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  const openChangeWrapper = (value: boolean) => {
    setOpenDialog(value);
  };

  return (
    <Dialog open={isOpenDialog} onOpenChange={openChangeWrapper}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter className="flex flex-col items-center md:flex-row gap-3 md:gap-0">
          <Button variant="secondary" className="w-20 text-foreground" size="sm" onClick={() => setOpenDialog(false)}>
            Batal
          </Button>
          <Button
            disabled={isLoading}
            onClick={async () => {
              setLoading(true);
              await onConfirm();
              setOpenDialog(false);
              setLoading(false);
            }}
            variant="default"
            size="sm"
            className="w-20"
          >
            {isLoading ? "Loading" : "Ya"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ModalConfirmAsync;
