import React from "react";
import Page from "./Page";
import Calendar from "./calendar";
import { startOfMonth } from "date-fns";

const CalendarPreview = () => {
  const firstDayOfMonth = startOfMonth(new Date());

  return (
    <>
      <Page width={210} height={297}>
        <Calendar type="month" firstDay={firstDayOfMonth} width={550} top={500} left={40} rotate={3} />
      </Page>
    </>
  );
};

export default CalendarPreview;
