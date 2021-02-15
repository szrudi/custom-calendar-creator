import { PageElementProps } from "../hoc/AsPageElement";
import { PageTemplate } from "../components/Page";
import { PageSizeData } from "./PageSize";

export enum daysOfWeek {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
}

export function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}

//#region Demo data below, it will come from somewhere later on...
// See /docs/dataStructurePlans.md for details
export const pageTemplates: PageTemplate[] = [
  {
    id: 1,
    defaultPageSize: 1,
    possiblePageSizes: [1, 2],
    elements: [
      {
        componentName: "Calendar",
        type: "month",
        variant: "horizontal",
        firstDay: new Date(),
        /**
         * Placements are in mm, we can calculate the placements in pixels
         * using the defaultPageSize data
         */
        placement: {
          top: 170,
          left: 10,
          width: 190,
          height: 117,
          rotate: 0,
        },
        options: {
          // locale: hu,
          weekStartsOn: 1,
          showGrid: true,
          showWeekNumbers: true,
          showNameDays: false,
          showHolidays: true,
          showCustomEvents: true,
          showWeekends: true,
        },
      },
      {
        componentName: "Content",
        layout: 1,
        placement: {
          top: 10,
          left: 10,
          width: 190,
          height: 150,
          rotate: 0,
        },
      },
    ],
  },
];

export const pageSizes: PageSizeData[] = [
  {
    id: 1,
    name: "A4-vertical",
    width: 210,
    height: 297,
    ppi: 300,
  },
  {
    id: 2,
    name: "A3",
    width: 297,
    height: 420,
    ppi: 300,
  },
  {
    id: 3,
    name: "120×180-landscape",
    width: 180,
    height: 120,
    ppi: 300,
  },
];

export const layouts = [
  {
    id: 1,
    name: "Single photo with one text",
    photoPlaceholders: [
      {
        key: "main-photo",
        placement: {
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          rotate: 0,
        } as PageElementProps["placement"],
      },
    ],
    textBoxes: [
      {
        key: "month-name",
        align: "center",
        value: "{MONTH}",
        placement: {
          top: "0",
          left: "90%",
          width: "100%",
          height: "10%",
          rotate: 0,
        } as PageElementProps["placement"],
      },
    ],
  },
];
// #endregion
