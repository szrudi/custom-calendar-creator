import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {enUS} from 'date-fns/locale'
import {endOfMonth, endOfWeek, format, getDay, getWeek, isSameMonth, startOfWeek} from "date-fns";
import eachDayOfInterval from 'date-fns/eachDayOfInterval'
import Day from "../Day";

const MonthHorizontal = ({year, month}: { year: number, month: number }) => {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const interval = {start: firstDayOfMonth, end: endOfMonth(firstDayOfMonth)};
    const isMondayFirstOfWeek = true;
    const days = getDaysOfWeeks(interval, {weekStartsOn: (isMondayFirstOfWeek ? 1 : 0)});
    const monthName = format(firstDayOfMonth, "LLLL", {locale: enUS})

    const classes = useStyles();
    return (<>
        <Typography variant="h2" gutterBottom align={"center"}>
            {monthName}
        </Typography>
        <table className={classes.monthTable}>
            <tbody>
            {Array.from(days.weeks).map(([weekNumber, week]) => (
                <tr key={`${year}-${weekNumber}`}>
                    {Array.from(week).map(([dayOfWeek, day]) => (
                        <td key={dayOfWeek}>
                            {isSameMonth(day, firstDayOfMonth) && <Day date={day}/>}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    </>);
};

export default MonthHorizontal;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        monthTable: {
            width: '100%',
            borderCollapse: 'collapse',
            borderStyle: 'hidden',
            '&  td': {
                padding: 0,
                borderWidth: 2,
                borderStyle: 'solid',
                borderColor: theme.palette.grey.A700,
            },
        },
    })
);

const getDaysOfWeeks = ({start, end}: Interval, options: { weekStartsOn?: weekDays }): daysByWeek => {
    const interval = {
        start: startOfWeek(start, options),
        end: endOfWeek(end, options)
    };
    let days: daysByWeek = {weeks: new Map()};
    for (const day of eachDayOfInterval(interval)) {
        const weekNumber = getWeek(day, options);
        const dayOfWeek = getDay(day);
        let week = days.weeks.get(weekNumber) ?? new Map();
        week.set(dayOfWeek, day);
        days.weeks.set(weekNumber, week);
    }
    return days;
};

interface daysByWeek {
    weeks: Map<number, Map<number, Date>>;
}

type weekDays = 0 | 1 | 2 | 3 | 4 | 5 | 6;
