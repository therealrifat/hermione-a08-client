import React from 'react';

const EventDetailsPage = async({params}) => {
    const {EventId} =await params

    return (
        <div>
            <h1>Details Page: {EventId}</h1>
        </div>
    );
};

export default EventDetailsPage;