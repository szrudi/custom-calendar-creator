import React from "react";

/**
 * AsPageElement HOC: we can add positioning to Page Elements
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
    const style: React.CSSProperties = {
      top,
      left,
      width,
      height,
      position: "relative",
      transform: `rotate(${rotate}deg)`,
    };
    return <div style={style}>{Component(componentProps as P)}</div>;
  }

  WrapperComponent.displayName = `asPageElement(${componentName})`;

  return WrapperComponent;
};

type ElementPlacementProps = Record<
  "top" | "left" | "width" | "height" | "rotate",
  number | string
>;

export default asPageElement;
