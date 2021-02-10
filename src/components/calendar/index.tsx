import React from "react";
import { eachDayOfInterval, eachWeekOfInterval, endOfWeek, getWeek, startOfWeek } from "date-fns";
import { assertNever, daysOfWeek } from "../../helpers/Globals";
import { Box } from "@material-ui/core";
import asPageElement, { ElementPlacementProps } from "../../hoc/AsPageElement";
import WeekHorizontal, { weekHorizontalNames } from "./types/WeekHorizontal";
import MonthHorizontal, { monthHorizontalNames } from "./types/MonthHorizontal";

const Calendar = (options: CalendarProps) => {
  return (
    <Box style={{ height: "auto" }} id={`${options.type}-calendar`}>
      {getCalendar(options)}
    </Box>
  );
};

export default asPageElement(Calendar);

type calendarTypes = monthHorizontalNames | weekHorizontalNames;

export type CalendarProps = {
  /** All implemented Calendar types */
  type: calendarTypes;
  /** The calendar should start with this date */
  firstDay: Date;
  weekStartsOn?: daysOfWeek;
  locale?: Locale;
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
    case "week":
    case "week-horizontal":
      return <WeekHorizontal {...options} />;
    default:
      return assertNever(options.type);
  }
};

type getWeekOptions = Parameters<typeof getWeek>[1];
type dateOptions = NonNullable<getWeekOptions>;
type daysByWeek = Array<Array<Date>>;

export const getDaysOfWeeks = (
  { start, end }: Interval,
  { weekStartsOn, firstWeekContainsDate = getFirstWeekContainsDate(weekStartsOn) }: dateOptions
): daysByWeek => {
  const options = { weekStartsOn, firstWeekContainsDate };
  const interval = {
    start: startOfWeek(start, options),
    end: endOfWeek(end, options),
  };

  return eachWeekOfInterval(interval, options).map((weekStart) =>
    eachDayOfInterval({ start: weekStart, end: endOfWeek(weekStart) })
  );
};

function getFirstWeekContainsDate(
  weekStartsOn: dateOptions["weekStartsOn"]
): NonNullable<dateOptions["firstWeekContainsDate"]> {
  // https://en.wikipedia.org/wiki/Week#Week_numbering
  switch (weekStartsOn) {
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
