import EventFrom from '@/components/form/event-from';
import React from 'react';

const CreateEventPage = () => {
    return (
        <div className='flex flex-col items-center'>
            <h1>Create Your Event</h1>
            <EventFrom/>
        </div>
    );
};

export default CreateEventPage;