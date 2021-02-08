import React from "react";
import Page from "./Page";
import Calendar, { CalendarElementProps } from "./calendar";
import { startOfMonth } from "date-fns";
import { daysOfWeek } from "../helpers/Globals";

const CalendarPreview = () => {
  const calendarOptions: CalendarElementProps = {
    type: "month",
    firstDay: startOfMonth(new Date()),
    weekStartsOn: daysOfWeek.Monday,
    width: 550,
    top: 450,
    left: 40,
    rotate: 3,
  };

  return (
    <Page width={210} height={297}>
      <Calendar {...calendarOptions} />
    </Page>
  );
};

export default CalendarPreview;
