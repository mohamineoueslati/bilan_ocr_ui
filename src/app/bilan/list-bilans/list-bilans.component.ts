import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { SortableTableDirective } from 'src/app/directives/sortable-table.directive';
import { BilanResponse } from 'src/app/models/bilan-response.model';
import { SortEvent } from 'src/app/models/sort-event.model';
import { BilanService } from 'src/app/services/bilan.service';

@Component({
  selector: 'app-list-bilans',
  templateUrl: './list-bilans.component.html',
  styleUrls: ['./list-bilans.component.css'],
})
export class ListBilansComponent implements OnInit {
  public bilans: Observable<BilanResponse[]>;
  public total: Observable<number>;

  @ViewChildren(SortableTableDirective)
  private headers?: QueryList<SortableTableDirective>;

  constructor(public bilanService: BilanService) {
    this.bilans = bilanService.bilans$;
    this.total = bilanService.total$;
  }

  ngOnInit(): void {
    this.bilanService.getBilans();
  }

  public onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers?.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.bilanService.sortColumn = column;
    this.bilanService.sortDirection = direction;
  }
}
