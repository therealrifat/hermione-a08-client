import Image from "next/image";

export interface IEvent {
  _id: string;
  eventTitle: string;
  category: string;
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
import { Calendar1, MapPin } from "lucide-react";

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
      <Card className="relative mx-auto w-full h-115 max-w-sm pt-0">
        <div className="absolute  z-30  " />
        <Image
          src={evnt.image}
          alt="Event cover"
          width={500}
          height={500}
          className="relative z-20 aspect-video w-full object-cover brightness dark:brightness-40"
        />
        <CardHeader className="flex flex-col gap-2">
          <CardAction>
            <Badge className="text-xs text-muted-foreground" variant="secondary">{evnt.category}</Badge>
          </CardAction>
          <CardTitle className="text-lg text-green-500 line-clamp-1">
            {evnt.eventTitle}
          </CardTitle>

          <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><Calendar1 className="h-3.5 w-3.5 text-green-600" /> {dateToText(evnt.eventDate)}</p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-green-600" />
            {evnt.location}
          </p>

          <CardDescription className=" line-clamp-2">
            {evnt.eventDescription}
          </CardDescription>
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
