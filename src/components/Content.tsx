import React from "react";
import asPageElement, { PageElement } from "../hoc/AsPageElement";
import { layouts } from "../helpers/Globals";

const Content = (options: ContentProps) => {
  let layout = layouts.find((layout: any) => layout.id === options.layout) ?? layouts[0];
  return <div>{layout.name}</div>;
};

type ContentProps = {
  componentName?: "Content"
  /** id of the layout to use */
  layout: number;
};

export type ContentElementProps = ContentProps & PageElement;
export default asPageElement(Content);
