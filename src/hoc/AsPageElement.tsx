import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";

/**
 * asPageElement HOC: we can add positioning to Page Elements
 *
 * based on https://react-typescript-cheatsheet.netlify.app/docs/hoc/intro
 *
 * @param Component The component to wrap
 * @param componentName
 */

const asPageElement = <P extends object, WP extends P & Partial<ElementPlacementProps>>(
  Component: { (props: P): Exclude<React.ReactNode, undefined>; displayName?: string },
  componentName = Component.displayName ?? Component.name
): { (props: WP): JSX.Element; displayName: string } => {
  function PageElement({
    top = 0,
    left = 0,
    width = "auto",
    height = "auto",
    rotate = 0,
    ...componentProps
  }: WP) {
    const classes = useStyles({ top, left, width, height, rotate });
    return <Box className={classes.element}>{Component(componentProps as P)}</Box>;
  }

  PageElement.displayName = `asPageElement(${componentName})`;

  return PageElement;
};

type ElementPlacementProps = Record<
  "top" | "left" | "width" | "height" | "rotate",
  number | string
>;

export default asPageElement;

const useStyles = makeStyles<Theme, ElementPlacementProps>({
  element: {
    position: "relative",
    top: (props) => props.top,
    left: (props) => props.left,
    width: (props) => props.width,
    height: (props) => props.height,
    transform: (props) => `rotate(${props.rotate}deg)`,
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    color: "white",
  },
});
