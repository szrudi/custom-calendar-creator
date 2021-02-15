import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { convertSize } from "../helpers/Globals";
import { PageElementProps, PageElements } from "../hoc/AsPageElement";
import Calendar, { CalendarElementProps } from "./calendar";
import Content, { ContentElementProps } from "./Content";
import { useLocale } from "../hooks/useLocale";

/**
 * Fixed aspect ratio Page component.
 *
 * @param {PageProps} props
 */
const Page = ({ pageTemplate, pageSize }: PageProps) => {
  const [locale] = useLocale();
  const classes = useStyles(pageSize);

  return !locale ? null : (
    <Box className={classes.page}>
      {pageTemplate.elements.map((element) => getPageElement(element))}
    </Box>
  );
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

export type PageTemplate = {
  id: number;
  defaultPageSize: number;
  possiblePageSizes: number[];
  elements: PageElements;
};

type PageProps = {
  children?: JSX.Element[] | JSX.Element;

  pageSize: PageSize;
  pageTemplate: PageTemplate;
};

export default Page;

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
