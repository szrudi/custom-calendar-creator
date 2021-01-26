import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import {enUS} from 'date-fns/locale'
import {endOfMonth, format, formatISO, getDate, getDay, isFirstDayOfMonth} from "date-fns";
import eachDayOfInterval from 'date-fns/eachDayOfInterval'

const MonthHorizontal = ({year = 2021, month = 1}) => {
    let firstDayOfMonth = new Date(year, month - 1, 1);
    let days = eachDayOfInterval({start: firstDayOfMonth, end: endOfMonth(firstDayOfMonth)});
    const isMondayFirstOfWeek = false;
    const columnStart = getDay(firstDayOfMonth) + (isMondayFirstOfWeek ? 0 : 1);
    const monthName = format(firstDayOfMonth, "LLLL", {locale: enUS})
    const classes = useStyles();

    return (<>
        <Typography variant="h2" gutterBottom align={"center"}>
            {monthName}
        </Typography>
        <div className={classes.container}>
            {days.map(day => (
                <div style={{gridColumnStart: isFirstDayOfMonth(day) ? columnStart : 'auto'}}
                     key={formatISO(day, {representation: 'date'})}>
                    <Paper className={classes.paper}>{getDate(day)}.</Paper>
                </div>
            ))}
        </div>
    </>);
};

export default MonthHorizontal;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'grid',
            gridTemplateColumns: 'repeat(7, minmax(10px, 1fr))',
            gridGap: theme.spacing(3),
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            whiteSpace: 'nowrap',
            marginBottom: theme.spacing(1),
        },
        divider: {
            margin: theme.spacing(2, 0),
        },
    }),
);
