import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { endOfWeek, format, getDay, getWeek, getYear, isSameMonth, startOfWeek } from "date-fns";
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

const WeekHorizontal = (props: Omit<CalendarElementProps, keyof PageElement>) => {
  warnAboutNotImplementedOptions(props, notImplementedOptions);
  const daysOfWeekInterval = {
    start: startOfWeek(props.firstDay, props.options),
    end: endOfWeek(props.firstDay, props.options),
  };
  const daysOfWeeks = getDaysOfWeeks(daysOfWeekInterval, props.options);
  const year = getYear(daysOfWeekInterval.start);
  const monthName = format(daysOfWeekInterval.start, "LLLL", props.options);

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
