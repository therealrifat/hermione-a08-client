import EventCard, { IEvent } from "@/components/shared/eventCard";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

const UpComingEvents = async () => {
  let events: IEvent[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      events = Array.isArray(data)
        ? [...data].sort(
            (a: IEvent, b: IEvent) =>
              new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
          )
        : [];
    }
  } catch {
    events = [];
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0">
      {/* Header */}
      <div className="flex flex-col items-center gap-6 mt-16 mb-10 text-center md:flex-row md:items-end md:justify-between md:text-left">
        <div className="space-y-3">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <CalendarDays className="h-5 w-5 text-green-600" />
            <span className="text-xs font-semibold uppercase tracking-widest text-green-600">
              What's Happening
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-green-800">
            Upcoming Events
          </h1>
          <p className="max-w-xl text-muted-foreground">
            Browse all initiatives created by community organizers — pick one
            that inspires you and join hands today.
          </p>
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            {events.length} event{events.length === 1 ? "" : "s"} open for join
          </span>
        </div>

        <Link href="/events/create">
          <Button className="bg-green-700 hover:bg-green-800 h-10">
            <CalendarDays /> Create Event
          </Button>
        </Link>
      </div>

      {/* Event grid */}
      {events.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border bg-green-50/50 px-6 py-12 text-center mb-10">
          <CalendarDays className="h-8 w-8 text-green-500" />
          <h2 className="text-lg font-bold text-green-900">
            No upcoming events yet
          </h2>
          <p className="text-sm text-muted-foreground">
            Be the first to bring your community together — create an event and
            inspire others to join.
          </p>
          <Link href="/events/create">
            <Button className="bg-green-700 hover:bg-green-800">
              <CalendarDays /> Create Event
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-5 mb-10">
          {events.map((evnt: IEvent) => (
            <EventCard key={evnt._id} evnt={evnt} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UpComingEvents;
