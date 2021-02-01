import React from 'react';
import {CssBaseline} from "@material-ui/core";
import Page from "./components/Page";
import Calendar from "./components/calendar";
import {getMonth, getYear} from "date-fns";

function App() {
    const currentDate = new Date();
    return (<>
        <CssBaseline/>
        <Page ratio={210 / 297}>
            <Calendar type='month' year={getYear(currentDate)} month={getMonth(currentDate) + 1}/>
        </Page>
    </>);
}

export default App;
