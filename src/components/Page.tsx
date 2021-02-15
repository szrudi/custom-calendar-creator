import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { Theme } from "@material-ui/core/styles";
import { convertSize } from "../helpers/Globals";

/**
 * Fixed aspect ratio Page component.
 *
 * @param {PageProps} props
 */
const Page = ({ children, pageSize }: PageProps) => {
  const classes = useStyles(pageSize);

  return <Box className={clsx(classes.page, classes.pageScale, classes.pageZoom)}>{children}</Box>;
};

const useStyles = makeStyles<Theme, PageSize>((theme: Theme) => ({
  page: {
    width: (pageSize) => convertSize(pageSize.width, pageSize.ppi),
    height: (pageSize) => convertSize(pageSize.height, pageSize.ppi),
    backgroundColor: theme.palette.info.main,
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
