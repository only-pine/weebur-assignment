export interface Sort {
  [key: string]: {
    sortBy: string;
    order: string;
  };
}

export type LayoutType = "list" | "grid";
