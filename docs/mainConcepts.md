## Main concepts of the new Custom Photo Calendar Creator

* **Printable calendar**
    * A calendar that the user created with her own photos/texts/events/…
    * It has finished pages like for example: Cover page (**Custom page**), 12 **Calendar
      pages**, and an End page (**
      Custom page**)
    * Can be downloaded as PDF to print
* **Calendar Template** (Product)
    * This is what can be selected by the user as a Product to customize and create a **
      Printable calendar**, has a product name
    * Predefined set of **Spreads** with **Page templates**, **Layouts**, **Page Sizes**,
      and a **Calendar theme**
    * Only **Page templates** with the same number of days can be in one Calendar template
* **Calendar theme**
    * Collection of possible **Page templates** that can be used by the user to create
      a **Printable calendar**
* **Page templates**
    * Predefined set of **Page elements** with placement/size on the Page template
    * Has possible **Page Sizes** (for sizes with the same aspect ratio it is possible to
      add multiple e.g. A3, A4, A5)
    * There can be a distinction if there is a **Calendar element** on a Page template (
      called a **Calendar page**) or not (called a **Custom page**).
    * It is important how many days are on one **Calendar page**
* **Spread**
    * The number of pages, and their orientation that create one view of the **Printable
      calendar**
    * Possible values: **one-page**, **two-page-vertical**, **two-page-horizontal**(?)
    * Example on the right side is a calendar with **2-vertical** spread
* **Page Size**
    * Size of a page in millimeters (mm) (height×width) and its orientation
    * Eg. **A5-portrait** or **120×180-landscape**
* **Page elements**
    * Elements that can be used to build a **Page template**, has placement and size on
      the page
    * Has a z-index like property
    * Some elements can be modified by the user others can not, for some elements this can
      be changed for the given template(?)
    * Elements: **Content**, **Textbox**, **Image**, **Calendar**
* **Content element**
    * An area where **Photo placeholders** and **Textbox elements** can be placed in a
      template
    * The number of elements and exact starting placements are defined by a **Layout**
    * Possible **Layouts** can be selected for a given Content element \
      (e.g. there can be only 1 or 2 photos in a small area, but it is possible to put 15
      images on a huge Content element on an A3 **Page template**)
* **Layout**
    * Starting Layout of a **Content element**
    * Can have **Photo placeholders** and **Textbox elements**
    * When the user is creating the **Printable calendar**, the position/size of the
      elements can be modified (even outside the Content element boundaries)
    * eg: the 2-vertical spread example image has a **Content element** with a Layout of
      one **Photo placeholder**. The user can select a 2×2 layout instead, so she can
      upload 4 smaller photos to that same area.
* **Textbox element**
    * Area where a user can enter text, or a **Page template** can have predefined texts
    * Can use MONTH, YEAR variables here
        * If this is a **Calendar page** then it will be the year or month of the first
          day on page
        * If this is a **Custom page** the next available **Calendar page** or if there
          are none following, then the previous **Calendar page**
* **Image element**
    * An image to decorate the **Page template** can be a Clip-Art or background
    * It always has an image in a **Page template**, it can not be just a placeholder like
      with the **Textbox** or **
      Photos**
    * Can the user change these? Can she select another background or clipart or can she
      upload her own?
* **Calendar element**
    * Predefined calendar component(s)
    * Can be 3 different types: day, month, year
    * Cardinality is the count of days/months/years in one element
        * Day components can have as many days as needed (typically 1, 7, 14…)
        * Month components represent one or more month(s) and has as many days as the
          month(s) has
        * Year components has n×12 months
    * A component has a layout for the days/moths in it
    * Can the weekends be turned ON/OFF? (what if there is a switched working Saturday?)
    * First day of week can be Monday or Sunday
    * Holidays/User events need a decoration (maybe with user selectable icons… etc)
    * Examples:
        * Week calendar that shows 7 days
        * Month calendar has 1 month
        * Quarter/Semester: it has 3/6 months in a single component, this could be used as
          a summary page in a business calendar, it can have a different layout then just
          3/6 one-month calendars on one page, can be used to mark roadmaps for team(s)
          for example
        * 2 week sprint calendar: has 14 consecutive days in one layout to represent a
          sprint and can have empty spaces for notes during a sprint plan for example
* **Photo placeholder**
    * An area where a photo can be uploaded by the user
    * Initial size/placement is based on the **Layout** but this can be modified by the
      user
    * Photo can be cropped and resized
    * Fill/Fit modes can be changed
* Other editor page elements:
    * **TODO list**
        * A list of tasks the user should do before the **Printable calendar** can be
          considered finished
        * Example: upload photos to **Photo placeholders**, fill-in empty **Textboxes**,
    * **Photo list**
        * List of uploaded photos
        * There is a feedback for photo quality for every photo
    * **Event list**
        * The list of events a user wants in her **Printable calendar**
        * Can have an icon
    * **Holiday list**
        * List of public holidays
        * Can change by country, so it is selectable which country’s holidays should be
          shown
        * Special day swaps should be handled here? Saturday/Sundays are handled like
          holidays?

### Components

* CalendarPreview
* Spread
* Page
    * Page Size
* Element (HOC)
    * Content
    * Textbox
    * Image
    * Calendar
        * ...
* Photo placeholders

### Data

* Printable calendar
* Calendar theme
* Calendar template (Product)
* Page template
* Layout

See [dataStructurePlans.md](dataStructurePlans.md) for details.
