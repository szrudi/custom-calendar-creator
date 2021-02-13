import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { endOfMonth, format, getDay, getWeek, getYear, isSameMonth, startOfMonth } from "date-fns";
import Day from "../Day";
import { CalendarElementProps, getDaysOfWeeks, warnAboutNotImplementedOptions } from "../index";
import { PageElement } from "../../../hoc/AsPageElement";

const notImplementedOptions = [
  "showGrid",
  "showWeekNumbers",
  "showNameDays",
  "showHolidays",
  "showCustomEvents",
  "showWeekends",
];

const MonthHorizontal = (props: Omit<CalendarElementProps, keyof PageElement>) => {
  warnAboutNotImplementedOptions(props, notImplementedOptions);
  const daysOfMonthInterval = {
    start: startOfMonth(props.firstDay),
    end: endOfMonth(props.firstDay),
  };
  const daysOfWeeks = getDaysOfWeeks(daysOfMonthInterval, props.options);
  const year = getYear(daysOfMonthInterval.start);
  const monthName = format(daysOfMonthInterval.start, "LLLL", props.options);

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
              <th key={getDay(day)}>{format(day, "EEE", props.options)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {daysOfWeeks.map((week) => (
            <tr key={`${year}-${getWeek(week[0], props.options)}`}>
              <th>{getWeek(week[0], props.options)}</th>
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
