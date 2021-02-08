import React from "react";
import MonthHorizontal from "./types/MonthHorizontal";

const Calendar = (options: CalendarProps) => {
  return <div id={`${options.type}-calendar`}>{getCalendar(options)}</div>;
};

const getCalendar = (options: CalendarProps): React.ReactNode => {
  switch (options.type) {
    case "month":
    case "month-horizontal":
      return <MonthHorizontal dayOfMonth={options.firstDay} />;
    default:
      return "";
  }
};

type calendarTypes = "month" | "month-horizontal";

type CalendarProps = {
  type: calendarTypes;
  firstDay: Date;
};

export default Calendar;
