import React from 'react';
import {CssBaseline} from "@material-ui/core";
import Page from "./components/Page";
import Calendar from "./components/calendar";

function App() {
    return (
        <>
            <CssBaseline/>
            <Page ratio={210 / 297}>
                <Calendar type='month' />
            </Page>
        </>
    );
}

export default App;
