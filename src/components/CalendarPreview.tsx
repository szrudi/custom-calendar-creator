import React from "react";
import Page from "./Page";
import Calendar, { CalendarElementProps } from "./calendar";
import { useLocale } from "../hooks/useLocale";

const CalendarPreview = () => {
  const [locale] = useLocale();

  if (!locale) return null;

  const calendarOptions: CalendarElementProps = {
    type: "month",
    firstDay: new Date(),
    // weekStartsOn: daysOfWeek.Monday,
    locale: locale!,
    // locale: nl,
    // locale: hu,
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
