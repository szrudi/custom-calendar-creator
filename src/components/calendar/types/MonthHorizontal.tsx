import React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";

const MonthHorizontal = ({year = 2021, month = 1}) => {
    const classes = useStyles();
    let days = getDays(year, month);
    let date = new Date(year, month, 0);
    let monthFormat = new Intl.DateTimeFormat('hu-HU', {month: 'long'});
    let monthName = monthFormat.format(date);

    return (<>
        <Typography variant="h2" gutterBottom align={"center"}>
            {monthName}
        </Typography>
        <div className={classes.container}>
            {days.map(day => (
                <div style={{gridColumnEnd: 'span 1'}} key={`${year}-${month}-${day}`}>
                    {day > 0 && <Paper className={classes.paper}>{day}.</Paper>}
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

function getDays(fullYear: number, month: number): number[] {
    let date = new Date(fullYear, month, 0);
    const isMondayFirstOfWeek = true;
    const firstDayOfMonth = date.getDay() - (isMondayFirstOfWeek ? 1 : 0);
    let days = [];
    for (let i = -firstDayOfMonth; i <= date.getDate(); i++) {
        days.push(i);
    }
    return days;
}
