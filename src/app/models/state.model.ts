import { SortColumn } from "../types/sort-column.type";
import { SortDirection } from "../types/sort-direction.type";

export interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}
