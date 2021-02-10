import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { endOfMonth, format, getDay, getWeek, getYear, isSameMonth, startOfMonth } from "date-fns";
import Day from "../Day";
import { CalendarElementProps, getDaysOfWeeks, warnAboutNotImplementedOptions } from "../index";
import { ElementPlacementProps } from "../../../hoc/AsPageElement";

const notImplementedOptions = [
  "showGrid",
  "showWeekNumbers",
  "showNameDays",
  "showHolidays",
  "showCustomEvents",
  "showWeekends",
];

const MonthHorizontal = (options: Omit<CalendarElementProps, keyof ElementPlacementProps>) => {
  warnAboutNotImplementedOptions(options, notImplementedOptions);
  const daysOfMonthInterval = {
    start: startOfMonth(options.firstDay),
    end: endOfMonth(options.firstDay),
  };
  const daysOfWeeks = getDaysOfWeeks(daysOfMonthInterval, options);
  const year = getYear(daysOfMonthInterval.start);
  const monthName = format(daysOfMonthInterval.start, "LLLL", options);

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
                  {isSameMonth(day, daysOfMonthInterval.start) && <Day date={day} />}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export type monthHorizontalNames = "month" | "month-horizontal";

export default MonthHorizontal;

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
