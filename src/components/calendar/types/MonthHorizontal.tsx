import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { enUS } from "date-fns/locale";
import { endOfMonth, format, getYear, isSameMonth, startOfMonth } from "date-fns";
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

const MonthHorizontal = (options: CalendarProps) => {
  warnAboutNotImplementedOptions(options, notImplementedOptions);
  const daysOfMonthInterval = {
    start: startOfMonth(options.firstDay),
    end: endOfMonth(options.firstDay),
  };
  const daysVisible = getDaysOfWeeks(daysOfMonthInterval, { weekStartsOn: options.weekStartsOn });
  const year = getYear(daysOfMonthInterval.start);
  const monthName = format(daysOfMonthInterval.start, "LLLL", { locale: enUS });
  const weeksArray = Array.from(daysVisible.weeks);
  const [, firstWeek] = weeksArray[0];
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
            {Array.from(firstWeek).map(([dayOfWeek, day]) => (
              <th key={dayOfWeek}>{format(day, "EEE")}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeksArray.map(([weekNumber, week]) => (
            <tr key={`${year}-${weekNumber}`}>
              <th>{weekNumber}</th>
              {Array.from(week).map(([dayOfWeek, day]) => (
                <td key={dayOfWeek}>
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
