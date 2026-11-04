import { IEvent } from "@/components/shared/eventCard";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { getTokenFormServer } from "@/lib/getTokenFormServer";
import {
  BadgeCheck,
  CalendarDays,
  CalendarSearch,
  Eye,
  MapPin,
  Tickets,
  LogIn,
  TicketCheck,
} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";

interface IJoinedEvent {
  eventId: string;
  eventName: string;
  email: string;
}

type IJoinedRow = Partial<IEvent> & IJoinedEvent;

const formatShortDate = (date?: string) => {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const JoinedEvent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
    const token = await getTokenFormServer();

  let joinedEvents: IJoinedRow[] = [];

  if (session?.user.email) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/EventJoin/${session.user.email}`,
        {
          cache: "no-store",
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.ok) {
        const data: IJoinedEvent[] = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          // Hydrate each joined event with its full event details in parallel
          const withDetails = await Promise.all(
            data.map(async (join: IJoinedEvent): Promise<IJoinedRow> => {
              try {
                const detailRes = await fetch(
                  `${process.env.NEXT_PUBLIC_SERVER_URL}/events/${join.eventId}`,
                  { cache: "no-store" },
                );

                if (detailRes.ok) {
                  const event: IEvent = await detailRes.json();
                  return { ...join, ...event, _id: join.eventId };
                }
                return { ...join, _id: join.eventId };
              } catch {
                return { ...join, _id: join.eventId };
              }
            }),
          );

          joinedEvents = withDetails.sort(
            (a, b) =>
              new Date(a.eventDate ?? 0).getTime() -
              new Date(b.eventDate ?? 0).getTime(),
          );
        }
      }
    } catch {
      joinedEvents = [];
    }
  }

  // Not logged in
  if (!session?.user.email) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        <div className="mt-16 flex flex-col items-center gap-3 rounded-2xl border bg-green-50/50 px-6 py-16 text-center dark:bg-green-950/40">
          <LogIn className="h-8 w-8 text-green-500 dark:text-green-400" />
          <h1 className="text-xl font-bold text-green-900 dark:text-green-400">
            Please log in to see your joined events
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in with your account to see all the community initiatives you
            have joined.
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

  const eventCount = joinedEvents.length;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0">
      {/* Header */}
      <div className="flex flex-col items-center gap-6 mt-16 mb-10 text-center md:flex-row md:items-end md:justify-between md:text-left">
        <div className="space-y-3">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <TicketCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="text-xs font-semibold uppercase tracking-widest text-green-600 dark:text-green-400">
              My Participation
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-green-800 dark:text-green-400">
            My Joined Events
          </h1>
          <p className="max-w-xl text-muted-foreground">
            Every initiative you joined — open the details to see what is coming
            next and where.
          </p>
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
            You joined {eventCount} event{eventCount === 1 ? "" : "s"}
          </span>
        </div>

        <Link href="/events">
          <Button className="bg-green-700 hover:bg-green-800 h-10">
            <CalendarDays /> Browse Events
          </Button>
        </Link>
      </div>

      {/* Empty state */}
      {eventCount === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border bg-green-50/50 px-6 py-12 text-center mb-10 dark:bg-green-950/40">
          <CalendarSearch className="h-8 w-8 text-green-500 dark:text-green-400" />
          <h2 className="text-lg font-bold text-green-900 dark:text-green-400">
            You haven&apos;t joined any events yet
          </h2>
          <p className="text-sm text-muted-foreground">
            Explore upcoming community initiatives and join the one that
            inspires you.
          </p>
          <Link href="/events">
            <Button className="bg-green-700 hover:bg-green-800">
              <CalendarDays /> Browse Events
            </Button>
          </Link>
        </div>
      ) : (
        /* Table */
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
              {joinedEvents.map((event) => (
                <tr
                  key={event.eventId}
                  className="border-b last:border-b-0 transition-colors hover:bg-green-50/60 dark:hover:bg-green-900/20"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="hidden sm:flex h-10 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-green-100 dark:bg-green-900/40">
                        {event.image ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={event.image}
                            alt={event.eventName}
                            className="h-10 w-16 object-cover"
                          />
                        ) : (
                          <Tickets className="h-5 w-5 text-green-600 dark:text-green-400" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={`/events/${event.eventId}`}
                          className="block font-semibold text-green-900 hover:text-green-700 hover:underline line-clamp-2 dark:text-green-100 dark:hover:text-green-300"
                        >
                          {event.eventName}
                        </Link>
                        <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                          <BadgeCheck className="h-3 w-3" />
                          Joined
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                    {formatShortDate(event.eventDate)}
                  </td>
                  <td className="hidden md:table-cell max-w-[180px] px-4 py-3">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-green-600 dark:text-green-400" />
                      <span className="truncate">{event.location ?? "—"}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {event.eventType ? (
                      <span className="inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-[10px] font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
                        {event.eventType}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/events/${event.eventId}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-green-700 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900/40"
                          aria-label="View event"
                        >
                          <Eye />
                        </Button>
                      </Link>
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

export default JoinedEvent;
