import React from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

/**
 * asPageElement HOC: we can add positioning to Page Elements
 *
 * based on https://react-typescript-cheatsheet.netlify.app/docs/hoc/intro
 *
 * @param Component The component to wrap, a Page Element
 * @param componentName
 */

const asPageElement = <P extends object, WP extends P & Partial<ElementPlacementProps>>(
  Component: { (props: P): Exclude<React.ReactNode, undefined>; displayName?: string },
  componentName = Component.displayName ?? Component.name
): { (props: WP): JSX.Element; displayName: string } => {
  function WrapperComponent({
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

  WrapperComponent.displayName = `asPageElement(${componentName})`;

  return WrapperComponent;
};

type ElementPlacementProps = Record<
  "top" | "left" | "width" | "height" | "rotate",
  number | string
>;

export default asPageElement;

const useStyles = makeStyles({
  element: {
    position: "relative",
    top: (props: ElementPlacementProps) => props.top,
    left: (props: ElementPlacementProps) => props.left,
    width: (props: ElementPlacementProps) => props.width,
    height: (props: ElementPlacementProps) => props.height,
    transform: (props: ElementPlacementProps) => `rotate(${props.rotate}deg)`,
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    color: "white",
  },
});
