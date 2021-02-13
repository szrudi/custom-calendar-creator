import React, { useLayoutEffect } from "react";
import Page, { PageSize } from "./Page";
import Calendar, { CalendarElementProps } from "./calendar";
import { useLocale } from "../hooks/useLocale";
import { makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { convertSize, pageSizes, pageTemplates } from "../helpers/Globals";
import { Container } from "@material-ui/core";
import { PageElement } from "../hoc/AsPageElement";
import Content, { ContentElementProps } from "./Content";

const CalendarPreview = () => {
  let pageTemplate = pageTemplates[0];
  let pageSize = pageSizes.find((ps) => ps.id === pageTemplate.defaultPageSize) ?? pageSizes[0];

  const [locale] = useLocale();
  const classes = useStyles({ pageSize });
  useLayoutEffect(trackWindowSizeChange, []);

  return !locale ? null : (
    <Container className={clsx(classes.pageScaleVariables, classes.previewWrapper)}>
      <Page pageSize={pageSize}>
        {pageTemplate.elements.map((element) => getPageElement(element))}
      </Page>
    </Container>
  );
};

export default CalendarPreview;

function trackWindowSizeChange() {
  function setInnerSize() {
    const root = document.documentElement;
    root.style.setProperty("--inner-width", `${window.innerWidth}`);
    root.style.setProperty("--inner-height", `${window.innerHeight}`);
  }

  setInnerSize();
  window.addEventListener("resize", setInnerSize);
  return () => window.removeEventListener("resize", setInnerSize);
}

const getPageElement = (props: PageElement): JSX.Element => {
  switch (props.componentName) {
    case "Calendar":
      return <Calendar {...(props as CalendarElementProps)} key={props.componentName} />;
    case "Content":
      return <Content {...(props as ContentElementProps)} key={props.componentName} />;
    default:
      return <></>;
  }
};

const useStyles = makeStyles<Theme, { pageSize: PageSize }>({
  "@global": {
    ":root": {
      "--inner-width": 800,
      "--inner-height": 800,
    },
  },
  pageScaleVariables: {
    "--preview-padding": 10,
    "--other-content-height": "calc(120 + var(--preview-padding)*2)",

    "--full-page-width": ({ pageSize: ps }) => convertSize(ps.width, ps.ppi),
    "--full-page-height": ({ pageSize: ps }) => convertSize(ps.height, ps.ppi),

    "--aspect-ratio": "calc(var(--full-page-height) / var(--full-page-width))",
    "--smaller-side": "calc(min(var(--inner-height),var(--inner-width)*var(--aspect-ratio)))",

    "--preview-page-height": "calc(max(var(--smaller-side) - var(--other-content-height), 200))",
    "--preview-page-width": "calc(var(--preview-page-height) / var(--aspect-ratio))",

    "--page-scale": "calc(var(--preview-page-height) / var(--full-page-height))",
    "--preview-scale": "var(--page-scale)",
  },
  previewWrapper: {
    margin: "0 20px",
    padding: "calc(1px * var(--preview-padding))",
    outline: "2px solid #555",
    backgroundColor: "lightblue",
    width: "calc(1px * (var(--preview-page-width) + var(--preview-padding)*2))",
    height: "calc(1px * (var(--preview-page-height) + var(--preview-padding)*2))",
    overflow: "hidden",
    fontSize: "4rem",
    lineHeight: "10rem",
  },
});
