import React from "react";
import asPageElement, { ElementPlacementProps } from "../hoc/AsPageElement";

const Content = (options: ContentProps) => {
  let layout = layouts.find((layout) => layout.id === options.layoutId) ?? layouts[0];
  return <div>{layout.name}</div>;
};

export default asPageElement(Content);

export type ContentProps = {
  layoutId: number;
};
export type ContentElementProps = ContentProps & Partial<ElementPlacementProps>;

const layouts = [
  {
    id: 1,
    name: "Single photo with one text",
    photoPlaceholders: [
      {
        key: "main-photo",
        placement: {
          x: "0",
          y: "0",
          width: "100%",
          height: "100%",
          rotate: "0",
        },
      },
    ],
    textBoxes: [
      {
        key: "month-name",
        align: "center",
        value: "{MONTH}",
        placement: {
          x: "0",
          y: "90%",
          width: "100%",
          height: "10%",
          rotate: "0",
        },
      },
    ],
  },
];
