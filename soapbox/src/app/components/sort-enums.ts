export enum SortType {
  LIKES = 0,
  DATE = 1,
}

export function getSortType(sortType: SortType): string {
  switch (sortType) {
    case SortType.DATE:
      return "DATE";
    default:
      return "LIKES";
  }
}

export function parseSortType(sortType: string) : SortType {
  switch (sortType) {
    case "DATE":
      return SortType.DATE;
    default:
      return SortType.LIKES;
  }
}


export enum SortOrder {
  ASC,
  DESC,
}

export function getSortOrder(sortOrder: SortOrder): string {
  switch (sortOrder) {
    case SortOrder.ASC:
      return "ASC";
    default:
      return "DESC";
  }
}

export enum Timeframe {
  DAY,
  WEEK,
  MONTH,
  YEAR,
  ALLTIME,
}