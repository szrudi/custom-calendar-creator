import React, { useEffect, useLayoutEffect } from "react";
import Page, { PageSize } from "./Page";
import Calendar, { CalendarElementProps } from "./calendar";
import { useLocale } from "../hooks/useLocale";
import { makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { convertSize, pageSizes, pageTemplates } from "../helpers/Globals";
import { Container } from "@material-ui/core";
import { PageElementProps } from "../hoc/AsPageElement";
import Content, { ContentElementProps } from "./Content";

const CalendarPreview = () => {
  let pageTemplate = pageTemplates[0];
  let pageSize = pageSizes.find((ps) => ps.id === pageTemplate.defaultPageSize) ?? pageSizes[0];

  const [locale] = useLocale();
  const classes = useStyles({ pageSize });
  useLayoutEffect(trackWindowSizeChange, []);
  useEffect(enableZoom, [locale]); // TODO hack

  return !locale ? null : (
    <Container className={clsx(classes.pageScaleVariables, classes.previewWrapper, 'page-zoom-variables')}>
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

function enableZoom() {
  let resetTimer: number;
  const setZoom: EventListener = (e) => {
    clearTimeout(resetTimer); // debounce resetZoom effect
    const wrapper = (e.currentTarget ?? e.target) as HTMLElement;
    const wrapperRect = wrapper.getBoundingClientRect();
    const cursor = (e as TouchEvent).touches?.[0] || e;
    setZoomVariables(wrapper, cursor.clientX - wrapperRect.x, cursor.clientY - wrapperRect.y, 0.7);
  };
  const setZoomVariables = (element: HTMLElement | null = null, x = 0, y = 0, zoom = 0) => {
    element = element || document.querySelector(".page-zoom-variables");
    if (!element) {
      return;
    }
    element.style.setProperty("--mouse-x", x.toString());
    element.style.setProperty("--mouse-y", y.toString());
    element.style.setProperty("--preview-zoom", zoom.toString());
  };

  // https://css-tricks.com/updating-a-css-variable-with-javascript/
  const wrapper: HTMLElement | null = document.querySelector(".page-zoom-variables");
  if (!wrapper) return;
  ["mousemove", "touchmove"].forEach((type) => {
    wrapper.addEventListener(type, setZoom);
  });

  ["mouseout", "touchend"].forEach((type) =>
    wrapper.addEventListener(type, () => {
      // this would cause a flicker on mouseout when
      // moving out of an inner element
      // it could be also solved with e.relatedTarget check
      if (type === "mouseout") {
        resetTimer = setTimeout(setZoomVariables, 100);
      } else {
        setZoomVariables();
      }
    })
  );
}

function getPageElement(props: PageElementProps): JSX.Element {
  switch (props.componentName) {
    case "Calendar":
      return <Calendar {...(props as CalendarElementProps)} key={props.componentName} />;
    case "Content":
      return <Content {...(props as ContentElementProps)} key={props.componentName} />;
    default:
      return <></>;
  }
}

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
    "--preview-scale": "var(--page-scale);",
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
