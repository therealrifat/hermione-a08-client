import EventCard from '@/components/shared/eventCard';
import React from 'react';

const UpComingEvents =async () => {
    const res = await fetch('http://localhost:8000/events')
    const events = await res.json()
    
    return (
        <div>
            

            {
                events.map((evnt, ind)=> <EventCard key={ind} evnt={evnt}/>)
            }


            


        </div>
    );
};

export default UpComingEvents;