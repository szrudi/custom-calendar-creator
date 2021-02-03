import React from 'react';
import Page from "./Page";
import Calendar from "./calendar";
import {getMonth, getYear} from "date-fns";

const CalendarPreview = () => {
    const currentDate = new Date();

    return (<>
        <Page width={210} height={297}>
            <Calendar type='month' year={getYear(currentDate)} month={getMonth(currentDate) + 1}/>
        </Page>
    </>);
};

export default CalendarPreview;