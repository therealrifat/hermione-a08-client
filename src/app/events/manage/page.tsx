import EventDelete from "@/components/shared/event-delete";
import EventEditPage from "@/components/shared/event-edit";
import { dateToText, IEvent } from "@/components/shared/eventCard";
import { auth } from "@/lib/auth";
import { Eye } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import React from "react";

const ManageEvent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

 

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/manage/${session?.user.email}`,
  );
  const yourEvents = await res.json();


  return (
    <div>
      <h1>manage event you create : {yourEvents.length} Event</h1>

      {yourEvents.map((e: IEvent, ind: number) => (
        <div key={ind} className="border flex gap-2">
          <div  className=" flex gap-2 hover:bg-slate-200">
            <h1>{e.eventTitle}</h1>
            <h1>{e.eventDescription}</h1>
            <h1>{dateToText(e.eventDate)}</h1>
            <h1>{e.eventType}</h1>
            <h1>{e.location}</h1>

            <Link href={`/events/${e._id}`}> <Eye/> </Link>
            <EventDelete id={e._id }/>
            <EventEditPage evnt={e}/>
            
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageEvent;
