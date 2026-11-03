import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock3, MapPin } from "lucide-react";

interface IRecentEvent {
  _id: string;
  eventTitle: string;
  eventType?: string;
  category?: string;
  eventDate: string;
  location: string;
  image: string;
}

const formatShortDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const RecentUpcomingEvent = async () => {
  let events: IRecentEvent[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/recent-event`,
      { cache: "no-store" }
    );

    if (res.ok) {
      const data = await res.json();
      events = Array.isArray(data)
        ? data.sort(
            (a: IRecentEvent, b: IRecentEvent) =>
              new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
          )
        : [];
    }
  } catch {
    events = [];
  }

  const upcoming = events.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 md:px-0">
      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="flex items-center justify-center gap-2">
          <Clock3 className="h-5 w-5 text-green-600" />
          <span className="text-xs font-semibold uppercase tracking-widest text-green-600">
            Fresh Events
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-green-800">
          Recent &amp; Upcoming Events
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground">
          The latest initiatives added by community organizers — join before
          spots fill up.
        </p>
      </div>

      {/* Empty state */}
      {upcoming.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border bg-green-50/50 px-6 py-12 text-center">
          <CalendarDays className="h-8 w-8 text-green-500" />
          <h3 className="text-lg font-bold text-green-900">
            No upcoming events yet
          </h3>
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
        /* Compact cards grid */
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((event) => (
            <Link
              key={event._id}
              href={`/events/${event._id}`}
              className="group block overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-200/50"
            >
              <div className="relative">
                <Image
                  src={event.image}
                  alt={event.eventTitle}
                  width={500}
                  height={300}
                  className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-green-700 px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm">
                  <CalendarDays className="h-3 w-3" />
                  {formatShortDate(event.eventDate)}
                </span>
              </div>

              <div className="space-y-2 p-4">
                <span className="inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-semibold text-green-700">
                  {event.eventType ?? event.category}
                </span>
                <h3 className="text-base font-bold text-green-900">
                  {event.eventTitle}
                </h3>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-green-600" />
                  {event.location}
                </p>
              </div>

              <div className="px-4 pb-4">
                <span className="flex w-full items-center justify-center rounded-lg border border-green-200 py-1.5 text-sm font-semibold text-green-700 transition-colors group-hover:bg-green-700 group-hover:text-white">
                  View Event
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentUpcomingEvent;
