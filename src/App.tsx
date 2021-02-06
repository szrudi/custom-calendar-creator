import React from "react";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import CalendarPreview from "./components/CalendarPreview";

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"}>
            <h1>Hello</h1>
            <Link to={"editor"}>Editor</Link>
          </Route>
          <Route exact path={"/editor"}>
            <h1>Editor</h1>
            <CalendarPreview />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
