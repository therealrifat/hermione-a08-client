import Image from "next/image";

export interface IEvent {
  _id: string;
  eventTitle: string;
  eventType: string;
  eventDate: string;
  location: string;
  image: string;
  eventDescription: string;
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export const dateToText = (date: string) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formattedDate;
};

const EventCard = ({ evnt }: { evnt: IEvent }) => {
  return (
    <div>
      <Card className="relative mx-auto w-full h-100 max-w-sm pt-0">
        <div className="absolute  z-30  " />
        <Image
          src={evnt.image}
          alt="Event cover"
          width={500}
          height={500}
          className="relative z-20 aspect-video w-full object-cover brightness dark:brightness-40"
        />
        <CardHeader>
          <CardAction>
            <Badge variant="secondary">{evnt.eventType}</Badge>
          </CardAction>
          <CardTitle className="text-lg text-green-500">
            {evnt.eventTitle}
          </CardTitle>

          <p>{dateToText(evnt.eventDate)}</p>

          <CardDescription className=" line-clamp-2">{evnt.eventDescription}</CardDescription>
        </CardHeader>

        <CardFooter>
          <Link href={`/events/${evnt._id}`}>
            <Button className="w-full bg-green-700">View Event</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EventCard;
