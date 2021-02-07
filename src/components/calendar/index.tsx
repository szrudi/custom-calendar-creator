import React from "react";
import MonthHorizontal from "./types/MonthHorizontal";
import asPageElement from "../../hoc/AsPageElement";

const Calendar = (options: CalendarProps) => {
  return (
    <div style={{ height: "100%" }} id={`${options.type}-calendar`}>
      {getCalendar(options)}
    </div>
  );
};

const getCalendar = (options: CalendarProps): React.ReactNode => {
  switch (options.type) {
    case "month":
    case "month-horizontal":
      return <MonthHorizontal firstDay={options.firstDay} />;
    default:
      return "";
  }
};

type calendarTypes = "month" | "month-horizontal";

type CalendarProps = {
  type: calendarTypes;
  firstDay: Date;
};

export default asPageElement(Calendar);
