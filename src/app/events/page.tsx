import EventCard, { IEvent } from "@/components/shared/eventCard";
import React from "react";

const UpComingEvents = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/events`,{ cache: 'no-store' });
  const events = await res.json();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
        {events.map((evnt: IEvent, ind: number) => (
          <EventCard key={ind} evnt={evnt} />
        ))}
      </div>
    </div>
  );
};

export default UpComingEvents;
