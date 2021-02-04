import React from 'react';
import {getDate} from "date-fns";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";

const Day = ({date}: { date: Date }) => {
    const classes = useStyles();

    return (
        <Box className={classes.dayElement}>{getDate(date)}</Box>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dayElement: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.primary,
            whiteSpace: 'nowrap',
            borderRadius: 0,
            border: 0,
            backgroundColor: theme.palette.background.default,
        },
    }),
);


export default Day;