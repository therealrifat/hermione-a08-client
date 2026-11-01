import Image from 'next/image';
import React from 'react';
export interface IEvent {
  _id: string
  eventTitle: string
  eventType: string
  eventDate: string
  location: string
  image: string
  eventDescription: string
}


const EventCard = ({evnt}:{evnt: IEvent}) => {
    console.log("console form evnetCard",evnt)
    return (
        <div>
          <div>
            <Image src={evnt.image} width={500} height={500} alt={evnt.eventTitle}/>
            <h1>Event: {evnt.eventTitle}</h1>
          </div>
        </div>
    );
};

export default EventCard;