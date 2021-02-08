import React from "react";
import MonthHorizontal, { monthHorizontalNames } from "./types/MonthHorizontal";
import { endOfWeek, getDay, getWeek, startOfWeek } from "date-fns";
import { assertNever, daysOfWeek } from "../../helpers/Globals";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import { Box } from "@material-ui/core";
import asPageElement, { ElementPlacementProps } from "../../hoc/AsPageElement";

const Calendar = (options: CalendarProps) => {
  return (
    <Box style={{ height: "auto" }} id={`${options.type}-calendar`}>
      {getCalendar(options)}
    </Box>
  );
};

export default asPageElement(Calendar);

type calendarTypes = monthHorizontalNames;

export type CalendarProps = {
  /** All implemented Calendar types */
  type: calendarTypes;
  /** The calendar should start with this date */
  firstDay: Date;
  weekStartsOn?: daysOfWeek;
  showGrid?: boolean;
  showWeekNumbers?: boolean;
  showNameDays?: boolean;
  showHolidays?: boolean;
  showCustomEvents?: boolean;
  showWeekends?: boolean;
};
export type CalendarElementProps = CalendarProps & Partial<ElementPlacementProps>;

const getCalendar = (options: CalendarProps): React.ReactNode => {
  switch (options.type) {
    case "month":
    case "month-horizontal":
      return <MonthHorizontal {...options} />;
    default:
      return assertNever(options.type);
  }
};

type getWeekOptions = Parameters<typeof getWeek>[1];
type dateOptions = Omit<NonNullable<getWeekOptions>, "locale">;
type daysByWeek = { weeks: Map<number, Map<number, Date>> };

export const getDaysOfWeeks = ({ start, end }: Interval, options: dateOptions): daysByWeek => {
  if (options.firstWeekContainsDate === undefined) {
    options = { firstWeekContainsDate: getFirstWeekContainsDate(options), ...options };
  }
  const interval = {
    start: startOfWeek(start, options),
    end: endOfWeek(end, options),
  };

  let days: daysByWeek = { weeks: new Map() };
  for (const day of eachDayOfInterval(interval)) {
    const weekNumber = getWeek(day, options);
    const dayOfWeek = getDay(day);
    let week = days.weeks.get(weekNumber) ?? new Map();
    week.set(dayOfWeek, day);
    days.weeks.set(weekNumber, week);
  }
  return days;
};

function getFirstWeekContainsDate(options: dateOptions): dateOptions["firstWeekContainsDate"] {
  // https://en.wikipedia.org/wiki/Week#Week_numbering
  switch (options.weekStartsOn) {
    case daysOfWeek.Monday: // ISO-8601 when week starts on Monday
      return 4;
    case daysOfWeek.Sunday:
      return 5;
    case daysOfWeek.Saturday:
      return 6;
    default:
      return 1;
  }
}

export function warnAboutNotImplementedOptions(
  options: CalendarProps,
  notImplementedOptions: string[]
) {
  Object.keys(options).forEach((option) => {
    if (notImplementedOptions.includes(option)) {
      console.warn(`Calendar option ${option} not yet implemented!`);
    }
  });
}
