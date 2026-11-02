import Link from "next/link";
import React from "react";

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ EventId: string }>;
}) => {
  const { EventId } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events/${EventId}`);
  const data = await res.json();

  return (
    <div>
        <Link href={"/events"}>Back to Upcoming Event</Link>
      <div className="max-w-7xl mx-auto">
        <h1>Details Page: {EventId}</h1>

        <h1>Title : {data.eventTitle}</h1>
      </div>
    </div>
  );
};

export default EventDetailsPage;
