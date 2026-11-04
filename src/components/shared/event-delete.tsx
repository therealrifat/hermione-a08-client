"use client";
import { Trash } from "lucide-react";
import React from "react";

import {
  AlertDialog,

  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";
import { getTokenFormClient } from "@/lib/getTokenFormClient";

const EventDelete = ({ id }: { id: string }) => {
  const router = useRouter();

  const handleDeleteEvent = async () => {
    const token = await getTokenFormClient()
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/manage/${id}`,
      {
        method: "DELETE",
        headers: {
        authorization: `Bearer ${token}`,
      },
      },
    );

    const afterSubmit = await res.json();

    if (afterSubmit.deletedCount > 0) {
      router.refresh();
      toast.success("delete");
    }
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger render={<Trash />}></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            
            <DialogClose onClick={handleDeleteEvent} render={<Button>Delete</Button>} />
            
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EventDelete;
