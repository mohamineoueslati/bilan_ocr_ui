import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { SortEvent } from '../models/sort-event.model';
import { SortColumn } from '../types/sort-column.type';
import { SortDirection } from '../types/sort-direction.type';

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class SortableTableDirective {
  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  private rotateData: { [key: string]: SortDirection } = {
    asc: 'desc',
    desc: '',
    '': 'asc',
  };

  constructor() {}

  rotate() {
    this.direction = this.rotateData[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}
