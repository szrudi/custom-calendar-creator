import React from 'react';
import Page from "./Page";
import Calendar from "./calendar";

const CalendarPreview = () => {
    const currentDate = new Date();

    return (<>
        <Page width={210} height={297}>
            <Calendar type='month' firstDay={currentDate}/>
        </Page>
    </>);
};

export default CalendarPreview;