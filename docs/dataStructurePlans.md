# Data structure plans

The concepts mentioned here are detailed in the
[Custom Photo Calendar Creator Planning](https://docs.google.com/document/d/1GidvJzmwesiGde0cEcd0WYWJWms2kcxGVfmyWsqoIC4/edit#heading=h.lg6xawe598v4)
Google Drive document.

## Printable calendar

A finished calendar that contains every detail, the user added picture, texts, selected
images... etc. In structure, it is similar to the Calendar Template, so see that for
details.

```javascript
[
  {
    id: 1,
    userdId: 1,
    calendarTemplate: 1,
    pages: [["..."], ["..."]],
  },
];
```

## Calendar Templates

Elements to customize the template with pre-filled texts, backgrounds... are in
the `elements` of a `page`. When creating a new calendar template everything is copied
here from a page template, and can be customized with photos, text, layouts, images...

`Calendar Theme` specifies which `Page Templates` can be ued in this `Calendar Template`.
Later on, it could contain a list of background images, predefined texts (e.g. quotes)...

This example contains two pages and four `Page Templates` can be used by the user to
create a `Printable Calendar`.

```javascript
[
  {
    id: 1,
    name: "12 page hanging calendar",
    description: "Calendar template example",
    spreadType: "one-page",
    possiblePageSizes: [1, 2],
    pages: [
      {
        pageTemplateId: 1,
        elements: ["..."],
      },
      {
        pageTemplateId: 1,
        elements: ["..."],
      },
    ],
    calendarTheme: {
      pageTemplates: [1, 2, 3, 4],
    },
  },
];
```

## Page Sizes

```javascript
[
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
```

## Page Templates

This is an example `Page Template` with one photo on the top, a textbox over the bottom
10% of the photo, and a monthly calendar in the bottom part of the page.

```javascript
[
  {
    id: 1,
    defaultPageSize: 1,
    possiblePageSizes: [1, 2],
    elements: [
      {
        component: "Calendar",
        type: "month (possible values: day|month|year)",
        cardinality: 1,
        variant: "horizontal",
        placement: {
          x: 10,
          y: 160,
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
          x: 10,
          y: 10,
          width: 190,
          height: 150,
          rotate: 0,
        },
      },
    ],
  },
];
```

These are TBD: bool and list of values/parameters like color, alignment... come from
context?

- showNameDays
- showHolidays
- showCustomEvents

## Layouts

A layout for a `Content`, this example is with one photo and one textbox.

```javascript
[
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
```
