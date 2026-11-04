"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";

import { Pencil } from "lucide-react";
import { IEvent } from "./eventCard";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getTokenFormClient } from "@/lib/getTokenFormClient";

const EventEditPage = ({ evnt }: { evnt: IEvent }) => {
  const [category, setCategory] = useState(evnt.eventType);
  const [date, setDate] = useState<Date>();
  const eventDate = date ? format(date, "yyyy-MM-dd") : "";

  const categoris = [
    { label: "Education", value: "Education" },
    { label: "Environment", value: "Environment" },
    { label: "Health & Wellness", value: "Health & Wellness" },
    { label: "Community & Culture", value: "Community & Culture" },
  ];
  const router =useRouter()
  const handleEditForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const event = Object.fromEntries(formData.entries());

    const updateEvent= {...event, eventDate, category,}
    const token = await getTokenFormClient()


    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/manage/${evnt._id}`,{
      method:"PATCH",
      headers: {"Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateEvent)
    })

    const afterSubmit = await res.json()
    console.log(afterSubmit)
    if(afterSubmit.modifiedCount > 0){

          toast.success("Event Update Successfull")
          router.refresh()
    }

  

  };

  return (
    <div>
      <Dialog>
        <DialogTrigger
          render={
            <Button variant="outline">
              <Pencil />
            </Button>
          }
        />

        <DialogContent className="sm:max-w-md">
          <form onSubmit={handleEditForm}>
            <DialogHeader>
              <DialogTitle>Update Event</DialogTitle>
              <DialogDescription>
                Make changes to your Event here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="form-title">Title</FieldLabel>
                <Input
                  id="form-title"
                  type="text"
                  name="eventTitle"
                  defaultValue={evnt.eventTitle}
                  placeholder="Blood Donation Campaign"
                  required
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field className="mx-auto w-44">
                  <FieldLabel htmlFor="date-picker-simple">Date</FieldLabel>
                  <Popover>
                    <PopoverTrigger
                      render={
                        <Button
                          variant="outline"
                          id="date-picker-simple"
                          className="justify-start font-normal"
                        >
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      }
                    />
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        defaultMonth={date}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);

                          return date < today;
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
                <Field>
                  <FieldLabel htmlFor="form-category">Category</FieldLabel>
                  <Select
                    items={categoris}
                    onValueChange={(value) => {
                      if (value !== null) setCategory(value);
                    }}
                    value={category}
                    defaultValue={evnt.eventType}
                  >
                    <SelectTrigger id="form-category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categoris.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="form-address">
                  Event Thumbnail URL
                </FieldLabel>
                <Input
                  id="form-address"
                  type="url"
                  defaultValue={evnt.image}
                  name="image"
                  placeholder="https://www.example.com/thumbnile/image"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="form-address">Event Location</FieldLabel>
                <Input
                  id="form-address"
                  type="text"
                  name="location"
                  defaultValue={evnt.location}
                  placeholder="Ramna Park, Dhaka"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  name="eventDescription"
                  placeholder="Share Your Description."
                  defaultValue={evnt.eventDescription}
                  rows={4}
                />
              </Field>
            </FieldGroup>

            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <DialogClose render={<Button type="submit" disabled={date ? false : true}>
                Save changes
              </Button>} />
              
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventEditPage;
