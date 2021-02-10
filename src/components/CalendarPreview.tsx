import React from "react";
import Page from "./Page";
import Calendar, { CalendarElementProps } from "./calendar";
import { daysOfWeek } from "../helpers/Globals";
import { enUS } from "date-fns/locale";

const CalendarPreview = () => {
  const calendarOptions: CalendarElementProps = {
    type: "month",
    firstDay: new Date(),
    weekStartsOn: daysOfWeek.Monday,
    locale: enUS,
    width: 550,
    top: 450,
    left: 40,
    rotate: 3,
  };

  const weekCalendarOptions = { ...calendarOptions };
  weekCalendarOptions.top = 150;
  weekCalendarOptions.type = "week";

  return (
    <Page width={210} height={297}>
      <Calendar {...weekCalendarOptions} />
      <Calendar {...calendarOptions} />
    </Page>
  );
};

export default CalendarPreview;
