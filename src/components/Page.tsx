import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import clsx from "clsx";

/**
 * Fixed aspect ratio Page component.
 *
 * @param {PageProps} props
 */
const Page = ({ children }: PageProps) => {
  const classes = useStyles();

  return <Box className={clsx(classes.page, classes.pageScale, classes.pageZoom)}>{children}</Box>;
};

const useStyles = makeStyles((theme) => ({
  page: {
    position: "relative",
    width: "calc(1px * var(--full-page-width))",
    height: "calc(1px * var(--full-page-height))",
    backgroundColor: theme.palette.info.main,
  },
  pageScale: {
    transformOrigin: "top left",
    transform: "scale(var(--preview-scale))",
    top: "calc(1px * var(--preview-top, 0))",
    left: "calc(1px * var(--preview-left, 0))",
  },
  pageZoom: {
    "--preview-scale": "max(var(--page-scale), var(--preview-zoom))",
    "--zoom-scale": "calc(var(--page-scale) / var(--preview-zoom))",
    "--preview-top":
      "calc((var(--mouse-y) - var(--preview-padding)) * (-1 / var(--zoom-scale) + 1))",
    "--preview-left":
      "calc((var(--mouse-x) - var(--preview-padding)) * (-1 / var(--zoom-scale) + 1))",
  },
}));

export type PageSize = {
  id: number;
  name: string;
  width: number;
  height: number;
  ppi: 150 | 300 | 600;
};
type PageProps = {
  children?: JSX.Element[] | JSX.Element;
  pageSize: PageSize;
};

export default Page;
