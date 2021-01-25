import React from "react";
import MonthHorizontal from "./types/MonthHorizontal";

const Calendar = ({type}: CalendarProps) => {
    type = type.toLowerCase().trim();
    return (
        <div id={`${type}-calendar`}>
            {getCalendar(type)}
        </div>
    );
};

const getCalendar = (name: string): React.ReactNode => {
    switch (name) {
        case "month":
        case "month-horizontal":
            return <MonthHorizontal/>;
        default:
            return "";
    }
};

interface CalendarProps {
    type: string;
}

export default Calendar;
