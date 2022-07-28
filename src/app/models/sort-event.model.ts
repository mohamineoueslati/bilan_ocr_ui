import { SortColumn } from "../types/sort-column.type";
import { SortDirection } from "../types/sort-direction.type";

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}
