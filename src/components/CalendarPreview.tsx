import React, { useEffect, useLayoutEffect } from "react";
import Page, { PageSize } from "./Page";
import { makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { convertSize, pageSizes, pageTemplates } from "../helpers/Globals";
import { Box, Container } from "@material-ui/core";

const CalendarPreview = () => {
  let pageTemplate = pageTemplates[0];
  let pageSize = pageSizes.find((ps) => ps.id === pageTemplate.defaultPageSize) ?? pageSizes[0];

  const classes = useStyles({ pageSize });
  useLayoutEffect(trackWindowSizeChange, []);
  useEffect(() => enableZoom(classes.zoomVariables), [classes.zoomVariables]);

  return (
    <Container
      className={clsx(classes.previewWrapper, classes.scaleVariables, classes.zoomVariables)}
    >
      <Box className={clsx(classes.pageScale)}>
        <Page pageSize={pageSize} pageTemplate={pageTemplate} />
      </Box>
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

function enableZoom(pageZoomClass: string) {
  let resetTimer: NodeJS.Timeout;
  const zoomElement: HTMLElement | null = document.querySelector(`.${pageZoomClass}`);
  if (!zoomElement) {
    console.warn("Failed to enable zoom on CalendarPreview");
    return;
  }

  ["mousemove", "touchmove"].forEach((type) => {
    zoomElement.addEventListener(type, (e) => {
      clearTimeout(resetTimer);
      const zoomRect = zoomElement.getBoundingClientRect();
      const cursor = (e as TouchEvent).touches?.[0] || e;
      setZoomVariables(zoomElement, cursor.clientX - zoomRect.x, cursor.clientY - zoomRect.y, 0.7);
    });
  });

  ["mouseout", "touchend"].forEach((type) =>
    zoomElement.addEventListener(type, (e) => {
      // This would cause a flicker on mouseout when moving out of an inner element
      // It could be also solved with target/relatedTarget inspection
      resetTimer = setTimeout(() => setZoomVariables(zoomElement), 100);
    })
  );
}

function setZoomVariables(element: HTMLElement, x = 0, y = 0, zoom = 0) {
  // https://css-tricks.com/updating-a-css-variable-with-javascript/
  element.style.setProperty("--mouse-x", x.toString());
  element.style.setProperty("--mouse-y", y.toString());
  element.style.setProperty("--preview-zoom", zoom.toString());
}

const useStyles = makeStyles<Theme, { pageSize: PageSize }>({
  "@global": {
    ":root": {
      "--inner-width": 800,
      "--inner-height": 800,
    },
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
  pageScale: {
    position: "relative",
    width: "calc(1px * var(--full-page-width))",
    height: "calc(1px * var(--full-page-height))",
    transformOrigin: "top left",
    transform: "scale(var(--preview-scale))",
    top: "calc(1px * var(--preview-top, 0))",
    left: "calc(1px * var(--preview-left, 0))",
  },
  scaleVariables: {
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
  zoomVariables: {
    "--mouse-x": 0,
    "--mouse-y": 0,
    "--preview-zoom": 0,
    "--preview-scale": "max(var(--page-scale), var(--preview-zoom))",
    "--zoom-scale": "calc(var(--page-scale) / var(--preview-zoom))",
    "--preview-top":
      "calc((var(--mouse-y) - var(--preview-padding)) * (-1 / var(--zoom-scale) + 1))",
    "--preview-left":
      "calc((var(--mouse-x) - var(--preview-padding)) * (-1 / var(--zoom-scale) + 1))",
  },
});
