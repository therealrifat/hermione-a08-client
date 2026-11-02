"use client";
import { Trash } from "lucide-react";
import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

const EventDelete = ({ id }: { id: number }) => {
  const handleDeleteEvent = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/manage/${id}`,{
        method: "DELETE",
      }
    );
    console.log(id)

    const afterSubmit = await res.json()

    // toast.success("Delete");
    console.log(afterSubmit)
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger render={<Trash />}></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteEvent}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EventDelete;
