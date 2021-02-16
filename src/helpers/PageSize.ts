import { PageElementProps } from "../hoc/AsPageElement";

export default class PageSize implements PageSizeClass {
  id: number;
  name: string;
  ppi: 150 | 300 | 600;
  private readonly _width: number;
  private readonly _height: number;

  constructor(ps: PageSizeData) {
    this.id = ps.id;
    this.name = ps.name;
    this.ppi = ps.ppi;
    this._width = ps.width;
    this._height = ps.height;
  }

  private convertSize = <T extends number | string>(value: T): T => {
    return typeof value === "number" ? (Math.round((this.ppi * value) / 25.4) as T) : value;
  };

  convertElementPlacementToPage = (props: PageElementProps["placement"]) => {
    const { height, left, top, width } = props;
    return {
      ...props,
      top: top ? this.convertSize(top) : 0,
      left: left ? this.convertSize(left) : 0,
      width: width ? this.convertSize(width) : "auto",
      height: height ? this.convertSize(height) : "auto",
    };
  };

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get widthPx(): number {
    return this.convertSize(this._width);
  }

  get heightPx(): number {
    return this.convertSize(this._height);
  }
}

export type PageSizeData = {
  id: number;
  name: string;
  width: number;
  height: number;
  ppi: 150 | 300 | 600;
};

interface PageSizeClass extends PageSizeData {}
