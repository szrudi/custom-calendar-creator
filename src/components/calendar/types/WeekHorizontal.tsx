import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { endOfWeek, format, getDay, getWeek, getYear, isSameMonth, startOfWeek } from "date-fns";
import Day from "../Day";
import { CalendarProps, getDaysOfWeeks, warnAboutNotImplementedOptions } from "../index";

const notImplementedOptions = [
  "showGrid",
  "showWeekNumbers",
  "showNameDays",
  "showHolidays",
  "showCustomEvents",
  "showWeekends",
];

const WeekHorizontal = (options: CalendarProps) => {
  warnAboutNotImplementedOptions(options, notImplementedOptions);
  const daysOfWeekInterval = {
    start: startOfWeek(options.firstDay, options),
    end: endOfWeek(options.firstDay, options),
  };
  const daysOfWeeks = getDaysOfWeeks(daysOfWeekInterval, options);
  const year = getYear(daysOfWeekInterval.start);
  const monthName = format(daysOfWeekInterval.start, "LLLL", options);

  const classes = useStyles();

  return (
    <>
      <Typography variant="h2" gutterBottom align={"center"}>
        {year} - {monthName}
      </Typography>
      <table className={classes.monthTable}>
        <thead>
          <tr>
            <th>{/* week numbers column */}</th>
            {daysOfWeeks[0].map((day) => (
              <th key={getDay(day)}>{format(day, "EEE", options)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {daysOfWeeks.map((week) => (
            <tr key={`${year}-${getWeek(week[0], options)}`}>
              <th>{getWeek(week[0], options)}</th>
              {week.map((day) => (
                <td key={getDay(day)}>
                  {isSameMonth(day, daysOfWeekInterval.start) && <Day date={day} />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export type weekHorizontalNames = "week" | "week-horizontal";

export default WeekHorizontal;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    monthTable: {
      width: "100%",
      borderCollapse: "collapse",
      borderStyle: "hidden",
      "&  td, &  th": {
        padding: 0,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: theme.palette.grey.A700,
      },
    },
  })
);
