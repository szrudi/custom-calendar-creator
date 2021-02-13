import React from "react";
import Page from "./Page";
import Calendar, { CalendarElementProps } from "./calendar";
import { useLocale } from "../hooks/useLocale";
import Content, { ContentElementProps } from "./Content";

const CalendarPreview = () => {
  const [locale] = useLocale();
  if (!locale) return null;

  let pageTemplate = pageTemplates[0];
  let pageSize = pageSizes.find((ps) => ps.id === pageTemplate.defaultPageSize) ?? pageSizes[0];
  return (
    <Page width={pageSize.width} height={pageSize.height}>
      {pageTemplate.elements.map((element) => getPageElement(element, locale))}
    </Page>
  );
};

export default CalendarPreview;

const getPageElement = (elementOptions: any, locale: Locale | null) => {
  switch (elementOptions.component) {
    case "Calendar":
      const calendarOptions: CalendarElementProps = {
        type: "month",
        firstDay: new Date(),
        // weekStartsOn: daysOfWeek.Monday,
        locale: locale!,
        // locale: nl,
        // locale: hu,
        width: 550,
        top: 450,
        left: 40,
        rotate: 3,
      };
      // const calendarOptions: CalendarElementProps = {
      //   type: elementOptions.type,
      //   firstDay: startOfMonth(new Date()),
      //   ...elementOptions.options,
      //   ...elementOptions.placement,
      // };
      return <Calendar {...calendarOptions} />;
    case "Content":
      const contentOptions: ContentElementProps = {
        layoutId: elementOptions.layout,
        ...elementOptions.options,
        ...elementOptions.placement,
      };
      return <Content {...contentOptions} />;
    default:
      return <></>;
  }
};

const pageTemplates = [
  {
    id: 1,
    defaultPageSize: 1,
    possiblePageSizes: [1, 2],
    elements: [
      {
        component: "Calendar",
        type: "month",
        cardinality: 1,
        variant: "horizontal",
        /**
         * Placements are in mm, we can calculate the placements in pixels
         * using the defaultPageSize data
         */
        placement: {
          top: 160,
          left: 10,
          width: 190,
          height: 117,
          rotate: 0,
        },
        options: {
          startOfWeek: "0-6",
          showGrid: true,
          showWeekNumbers: true,
          showNameDays: false,
          showHolidays: true,
          showCustomEvents: true,
          showWeekends: true,
        },
      },
      {
        component: "Content",
        layout: 1,
        placement: {
          top: 10,
          left: 10,
          width: 190,
          height: 150,
          rotate: 0,
        },
        options: {},
      },
    ],
  },
];

const pageSizes = [
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
