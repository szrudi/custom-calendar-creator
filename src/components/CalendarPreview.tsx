import React, { useEffect, useLayoutEffect } from "react";
import Page from "./Page";
import { makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { pageSizes, pageTemplates } from "../helpers/Globals";
import { Box, Container } from "@material-ui/core";
import PageSize from "../helpers/PageSize";

const CalendarPreview = () => {
  //#region Test data, these will come from somewhere later on, maybe props?
  let pageTemplate = pageTemplates[0];
  let pageSizeData = pageSizes.find((ps) => ps.id === pageTemplate.defaultPageSize) ?? pageSizes[0];
  let pageSize = new PageSize(pageSizeData);
  //#endregion

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
  window.addEventListener("resize", setInnerSize);
  setInnerSize();
  return () => window.removeEventListener("resize", setInnerSize);

  function setInnerSize() {
    const root = document.documentElement;
    root.style.setProperty("--inner-width", `${root.clientWidth}`);
    root.style.setProperty("--inner-height", `${root.clientHeight}`);
  }
}

function enableZoom(pageZoomClass: string) {
  const zoomElement: HTMLElement | null = document.querySelector(`.${pageZoomClass}`);
  if (!zoomElement) {
    console.warn("Failed to enable zoom on CalendarPreview");
    return;
  }

  zoomElement.addEventListener("pointermove", handlePointerMove);
  zoomElement.addEventListener("pointerleave", handlePointerLeave);

  return () => {
    zoomElement.removeEventListener("pointermove", handlePointerMove);
    zoomElement.removeEventListener("pointerleave", handlePointerLeave);
  };

  function handlePointerMove(e: PointerEvent) {
    if (!e.isPrimary) return;

    const currentTarget = e.currentTarget as HTMLElement;
    const zoomRect = currentTarget.getBoundingClientRect();
    setZoomVariables(currentTarget, e.clientX - zoomRect.x, e.clientY - zoomRect.y, 0.7);
  }

  function handlePointerLeave(e: PointerEvent) {
    const currentTarget = e.currentTarget as HTMLElement;
    setZoomVariables(currentTarget);
  }

  function setZoomVariables(element: HTMLElement, x = 0, y = 0, zoom = 0) {
    // https://css-tricks.com/updating-a-css-variable-with-javascript/
    element.style.setProperty("--mouse-x", x.toString());
    element.style.setProperty("--mouse-y", y.toString());
    element.style.setProperty("--preview-zoom", zoom.toString());
  }
}

const useStyles = makeStyles<Theme, { pageSize: PageSize }>({
  "@global": {
    ":root": {
      "--inner-width": 800,
      "--inner-height": 800,
      "--rem-value": 20,
      fontSize: "calc(1px * var(--rem-size))",
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
    "--other-content-height": "calc(4.6 * var(--rem-value) + var(--preview-padding)*2)",

    "--full-page-width": ({ pageSize }) => pageSize.widthPx,
    "--full-page-height": ({ pageSize }) => pageSize.heightPx,

    "--aspect-ratio": "calc(var(--full-page-height) / var(--full-page-width))",
    "--smaller-side": "calc(min(var(--inner-height),var(--inner-width)*var(--aspect-ratio)))",

    "--preview-page-height": "calc(max(var(--smaller-side) - var(--other-content-height), 200))",
    "--preview-page-width": "calc(var(--preview-page-height) / var(--aspect-ratio))",

    "--page-scale": "calc(var(--preview-page-height) / var(--full-page-height))",
    "--preview-scale": "var(--page-scale);",
  },
  zoomVariables: {
    touchAction: "none",
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
