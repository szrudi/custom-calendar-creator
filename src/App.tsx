import React from 'react';
import CalendarElement from "./components/CalendarElement";
import {CssBaseline} from "@material-ui/core";
import Page from "./components/Page";

function App() {
    return (
        <>
            <CssBaseline/>
            <Page ratio={210 / 297}>
                <CalendarElement/>
            </Page>
        </>
    );
}

export default App;
