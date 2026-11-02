import EventDelete from "@/components/shared/event-delete";
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

  console.log(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/manage/${session?.user.email}`,
  );

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
            <h1>{dateToText(e.eventDate)}</h1>
            <Link href={`/events/${e._id}`}> <Eye/> </Link>
            <EventDelete id={e._id} />
            
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageEvent;
