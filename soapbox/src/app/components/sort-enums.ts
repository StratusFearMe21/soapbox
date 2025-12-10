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
  DAY = 1,
  WEEK = 7,
  MONTH = 30,
  YEAR = 365,
  ALLTIME = 10000000000, // useless
}

export function getTimeframe(timeframe: Timeframe): string {
  switch (timeframe) {
    case Timeframe.DAY:
      return "DAY";
    case Timeframe.MONTH:
      return "MONTH";
    case Timeframe.YEAR:
      return "YEAR";
    case Timeframe.ALLTIME:
      return "ALL-TIME";
    default:
      return "WEEK";
  }
}