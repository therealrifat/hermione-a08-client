import EventDelete from "@/components/shared/event-delete";
import EventEditPage from "@/components/shared/event-edit";
import { IEvent } from "@/components/shared/eventCard";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import {
  CalendarDays,
  CalendarPlus,
  Eye,
  LayoutList,
  LogIn,
  MapPin,
} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";

type IManageEvent = IEvent & { category?: string };

const formatShortDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const ManageEvent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  let yourEvents: IManageEvent[] = [];

  if (session?.user.email) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/manage/${session.user.email}`,
        { cache: "no-store" }
      );

      if (res.ok) {
        const data = await res.json();
        yourEvents = Array.isArray(data)
          ? [...data].sort(
              (a: IManageEvent, b: IManageEvent) =>
                new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
            )
          : [];
      }
    } catch {
      yourEvents = [];
    }
  }

  // Not logged in
  if (!session?.user.email) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        <div className="mt-16 flex flex-col items-center gap-3 rounded-2xl border bg-green-50/50 px-6 py-16 text-center dark:bg-green-950/40">
          <LogIn className="h-8 w-8 text-green-500 dark:text-green-400" />
          <h1 className="text-xl font-bold text-green-900 dark:text-green-400">
            Please log in to manage your events
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in with your account to view, edit, or delete the events you
            created.
          </p>
          <Link href="/login">
            <Button className="bg-green-700 hover:bg-green-800">
              <LogIn /> Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const eventCount = yourEvents.length;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0">
      {/* Header */}
      <div className="flex flex-col items-center gap-6 mt-16 mb-10 text-center md:flex-row md:items-end md:justify-between md:text-left">
        <div className="space-y-3">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <LayoutList className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-green-600 dark:text-green-400">
              My Dashboard
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-green-800 dark:text-green-400">
            Manage My Events
          </h1>
          <p className="max-w-xl text-muted-foreground">
            Update the details, delete outdated initiatives, or highlight an
            event for community members to join.
          </p>
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
            You created {eventCount} event{eventCount === 1 ? "" : "s"}
          </span>
        </div>

        <Link href="/events/create">
          <Button className="bg-green-700 hover:bg-green-800 h-10">
            <CalendarDays /> Create Event
          </Button>
        </Link>
      </div>

      {/* Empty state */}
      {eventCount === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border bg-green-50/50 px-6 py-12 text-center mb-10 dark:bg-green-950/40">
          <CalendarPlus className="h-8 w-8 text-green-500 dark:text-green-400" />
          <h2 className="text-lg font-bold text-green-900 dark:text-green-400">No events yet</h2>
          <p className="text-sm text-muted-foreground">
            Bring your community together — create your first event and inspire
            others to join.
          </p>
          <Link href="/events/create">
            <Button className="bg-green-700 hover:bg-green-800">
              <CalendarDays /> Create Event
            </Button>
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border bg-white mb-10 dark:bg-gray-900">
          <table className="w-full table-auto text-left text-sm">
            <thead>
              <tr className="border-b bg-green-50/60 text-xs uppercase tracking-wider text-green-800 dark:bg-green-950/50 dark:text-green-300">
                <th className="px-4 py-3 font-semibold">Event</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="hidden md:table-cell px-4 py-3 font-semibold">
                  Location
                </th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {yourEvents.map((event) => (
                <tr
                  key={event._id}
                  className="border-b last:border-b-0 transition-colors hover:bg-green-50/60 dark:hover:bg-green-900/20"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="hidden sm:block h-10 w-16 shrink-0 overflow-hidden rounded-lg">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={event.image}
                          alt={event.eventTitle}
                          className="h-10 w-16 object-cover"
                        />
                      </div>
                      <Link
                        href={`/events/${event._id}`}
                        className="font-semibold text-green-900 hover:text-green-700 hover:underline line-clamp-2 dark:text-green-100 dark:hover:text-green-300"
                      >
                        {event.eventTitle}
                      </Link>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                    {formatShortDate(event.eventDate)}
                  </td>
                  <td className="hidden md:table-cell max-w-[180px] px-4 py-3">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-green-600 dark:text-green-400" />
                      <span className="truncate">{event.location}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                      {event.eventType ?? event.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/events/${event._id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-green-700 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/40"
                          aria-label="View event"
                        >
                          <Eye />
                        </Button>
                      </Link>
                      <EventEditPage evnt={event} />
                      <EventDelete id={event._id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageEvent;
