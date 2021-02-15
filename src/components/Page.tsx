import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { PageElementProps, PageElements } from "../hoc/AsPageElement";
import Calendar, { CalendarElementProps } from "./calendar";
import Content, { ContentElementProps } from "./Content";
import { useLocale } from "../hooks/useLocale";
import PageSize from "../helpers/PageSize";

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
      {pageTemplate.elements.map((element) => getPageElement(element, pageSize))}
    </Box>
  );
};

const useStyles = makeStyles<Theme, PageSize>((theme: Theme) => ({
  page: {
    width: (pageSize) => pageSize.widthPx,
    height: (pageSize) => pageSize.heightPx,
    backgroundColor: theme.palette.info.main,
  },
}));

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

function getPageElement(props: PageElementProps, pageSize: PageSize): JSX.Element {
  const propsOnPage: PageElementProps = {
    ...props,
    placement: pageSize.convertElementPlacementToPage(props.placement),
  };

  switch (props.componentName) {
    case "Calendar":
      return <Calendar {...(propsOnPage as CalendarElementProps)} key={props.componentName} />;
    case "Content":
      return <Content {...(propsOnPage as ContentElementProps)} key={props.componentName} />;
    default:
      return <></>;
  }
}
