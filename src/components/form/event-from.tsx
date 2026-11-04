"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import React, { useState } from "react";
import { format } from "date-fns";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { getTokenFormClient } from "@/lib/getTokenFormClient";

export default function EventFrom() {
  const [category, setCategory] = useState("Education");
  const [date, setDate] = useState<Date>();
  const eventDate = date ? format(date, "yyyy-MM-dd") : "";

  const categoris = [
    { label: "Education", value: "Education" },
    { label: "Environment", value: "Environment" },
    { label: "Health & Wellness", value: "Health & Wellness" },
    { label: "Community & Culture", value: "Community & Culture" },
  ];
  const { data: session } = authClient.useSession();


  const userInfo = session?.user;
 
  

  const handleEventForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const event = Object.fromEntries(formData.entries());
    const eventData = {
      ...event,
      eventDate,
      category,
      creatorName: userInfo?.name,
      creatorEmail: userInfo?.email,
    };
     const token= await getTokenFormClient()

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" ,
      authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });

    const afterSubmit = await res.json();

    if (afterSubmit.insertedId) {
      toast.success("Event Added Successful");
      redirect("/events");
    }
  };

  return (
    <div className="border p-10 rounded-2xl">
      <form className="w-sm" onSubmit={handleEventForm}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="form-title">Title</FieldLabel>
            <Input
              id="form-title"
              type="text"
              name="eventTitle"
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
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
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
                defaultValue="Education"
              >
                <SelectTrigger id="form-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categoris.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="form-address">Event Thumbnail URL</FieldLabel>
            <Input
              id="form-address"
              type="url"
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
              placeholder="Ramna Park, Dhaka"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              name="eventDescription"
              placeholder="Share Your Description."
              rows={4}
            />
          </Field>
          <Field orientation="horizontal">
            <Button type="reset" variant="outline">
              Reset
            </Button>
            <Button type="submit" disabled={date ? false : true}>
              Submit
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
