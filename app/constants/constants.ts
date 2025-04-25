import { Sort } from "../types/search";

export const DEFAULT_SORT = "기본 정렬순";
export const LOW_RATING_SORT = "낮은 별점순";
export const HIGH_RATING_SORT = "높은 별점순";
export const SEARCH_BUTTON_TEXT = "검색";
export const SEARCH_INPUT_PLACEHOLDER = "상품 검색";
export const TOTAL_TEXT = "총";
export const PRODUCT_UNIT = "개";

export const SORT_OPTIONS: Sort = {
  [DEFAULT_SORT]: { sortBy: "", order: "" },
  [LOW_RATING_SORT]: { sortBy: "rating", order: "asc" },
  [HIGH_RATING_SORT]: { sortBy: "rating", order: "desc" },
};

export const MESSAGES: { [key: string]: string } = {
  NO_MORE_DATA: "더 이상 불러올 수 없습니다.",
};
