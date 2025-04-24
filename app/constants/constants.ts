import { Sort } from "../types/search";

export const SORT_OPTIONS: Sort = {
  "기본 정렬순": { sortBy: "", order: "" },
  "낮은 정렬순": { sortBy: "rating", order: "asc" },
  "높은 정렬순": { sortBy: "rating", order: "desc" },
};
