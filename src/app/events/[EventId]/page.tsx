import EventJoind from "@/components/shared/event-joined";
import { IEvent, dateToText } from "@/components/shared/eventCard";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  ArrowLeft,
  CalendarDays,
  CalendarSearch,
  MapPin,
  Mail,
  UserRound,
} from "lucide-react";

interface IEventDetails extends IEvent {
  category?: string;
  creatorName?: string;
  creatorEmail?: string;
}

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ EventId: string }>;
}) => {
  const { EventId } = await params;

  let event: IEventDetails | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/events/${EventId}`,
      { cache: "no-store" }
    );

    if (res.ok) {
      event = await res.json();
    }
  } catch {
    event = null;
  }

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        <div className="mt-16 flex flex-col items-center gap-3 rounded-2xl border bg-green-50/50 px-6 py-16 text-center">
          <CalendarSearch className="h-8 w-8 text-green-500" />
          <h1 className="text-xl font-bold text-green-900">Event not found</h1>
          <p className="text-sm text-muted-foreground">
            This event may have been removed or the link is broken.
          </p>
          <Link href="/events">
            <Button className="bg-green-700 hover:bg-green-800">
              <CalendarDays /> Back to Upcoming Events
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const category = event.eventType ?? event.category;
  const organizerInitial = event.creatorName?.charAt(0)?.toUpperCase();

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0">
      {/* Back link */}
      <div className="mt-8">
        <Link href="/events">
          <Button variant="outline" className="text-green-800">
            <ArrowLeft /> Back to Upcoming Events
          </Button>
        </Link>
      </div>

      {/* Hero */}
      <div className="mt-6 mb-16 flex flex-col gap-8 lg:flex-row">
        {/* Cover image */}
        <div className="lg:w-[55%]">
          <Image
            src={event.image}
            alt={event.eventTitle}
            width={1000}
            height={600}
            className="aspect-video w-full rounded-2xl object-cover"
          />
        </div>

        {/* Event info */}
        <div className="flex-1 space-y-4">
          {category && (
            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              {category}
            </span>
          )}

          <h1 className="text-2xl md:text-3xl font-bold text-green-900">
            {event.eventTitle}
          </h1>

          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4 text-green-600" />
            {dateToText(event.eventDate)}
          </p>

          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-green-600" />
            {event.location}
          </p>

          {/* Organizer */}
          <div className="flex items-center gap-3 rounded-2xl border p-3">
            <Avatar>
              {organizerInitial ? (
                <AvatarFallback className="bg-green-100 text-sm font-semibold text-green-800">
                  {organizerInitial}
                </AvatarFallback>
              ) : (
                <AvatarFallback className="bg-green-100 text-green-800">
                  <UserRound className="h-4 w-4" />
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <p className="text-xs text-muted-foreground">Organized by</p>
              <p className="text-sm font-semibold text-green-900">
                {event.creatorName ?? "Community organizer"}
              </p>
              {event.creatorEmail && (
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  {event.creatorEmail}
                </p>
              )}
            </div>
          </div>

          <p className="leading-relaxed text-muted-foreground">
            {event.eventDescription}
          </p>

          {/* Join */}
          <div className="pt-2">
            <div className="max-w-xs [&_button]:w-full [&_button]:bg-green-700 [&_button]:hover:bg-green-800 [&_button]:h-11 [&_button]:text-base">
              <EventJoind data={event} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
