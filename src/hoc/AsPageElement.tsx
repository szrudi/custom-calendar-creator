import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { convertSize } from "../helpers/Globals";
import { CalendarElementProps } from "../components/calendar";
import { ContentElementProps } from "../components/Content";

/**
 * asPageElement HOC: we can add positioning to Page Elements
 *
 * based on https://react-typescript-cheatsheet.netlify.app/docs/hoc/intro
 *
 * @param Component The component to wrap
 * @param componentName
 */

const asPageElement = <P extends object>(
  Component: { (props: P): Exclude<React.ReactNode, undefined>; displayName?: string },
  componentName = Component.displayName ?? Component.name
): { (props: P & PageElementProps): JSX.Element; displayName: string } => {
  function PageElement({ placement, componentName, ...componentProps }: P & PageElementProps) {
    const classes = useStyles({ ...placement });
    return <Box className={classes.elementPlacement}>{Component(componentProps as P)}</Box>;
  }

  PageElement.displayName = `asPageElement(${componentName})`;

  return PageElement;
};

const useStyles = makeStyles({
  elementPlacement: (props: PageElementProps["placement"]) => {
    const ppi = props.ppi ?? 300;
    return {
      position: "absolute",
      outline: "1px solid", // for testing only
      top: props.top ? convertSize(props.top, ppi) : 0,
      left: props.left ? convertSize(props.left, ppi) : 0,
      width: props.width ? convertSize(props.width, ppi) : "auto",
      height: props.height ? convertSize(props.height, ppi) : "auto",
      transform: props.rotate ? `rotate(${props.rotate}deg)` : "none",
    };
  },
});

export default asPageElement;

export type PageElementProps = {
  placement: Partial<
    Record<"rotate" | "ppi", number> & Record<"top" | "left" | "width" | "height", number | string>
  >;
  componentName: string;
};

export type PageElements = Array<CalendarElementProps | ContentElementProps>;
