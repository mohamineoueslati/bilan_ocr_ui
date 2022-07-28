import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, PipeTransform } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  delay,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { BilanDocument } from '../models/bilan-document.model';
import { BilanResponse } from '../models/bilan-response.model';
import { Bilan } from '../models/bilan.model';
import { SearchResult } from '../models/search-result.model';
import { State } from '../models/state.model';
import { SortColumn } from '../types/sort-column.type';
import { SortDirection } from '../types/sort-direction.type';

@Injectable({
  providedIn: 'root',
})
export class BilanService {
  private url = 'bilans';
  private fetchedBilans: BilanResponse[] = [];
  private _bilans$ = new BehaviorSubject<BilanResponse[]>([]);
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  constructor(private http: HttpClient, private pipe: DecimalPipe) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._bilans$.next(result.bilans);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  public getBilans() {
    this.http.get<BilanResponse[]>(this.url).subscribe((bilans) => {
      this.fetchedBilans = bilans;
      this._search$.next();
    });
  }

  public getBilan(matricule: string) {
    return this.http.get<BilanResponse>(`${this.url}/${matricule}`);
  }

  public postBilan(bilanInfo: BilanDocument) {
    const formData = new FormData();
    formData.append('matricule', bilanInfo.matricule);
    formData.append('rs', bilanInfo.rs);
    formData.append('year', String(bilanInfo.year));
    formData.append('etat', bilanInfo.etat);
    formData.append('document', bilanInfo.document);

    return this.http.post(`${this.url}/upload`, formData);
  }

  public updateBilan(matricule: string, bilan: Bilan) {
    return this.http.put(`${this.url}/${matricule}`, bilan);
  }

  public deleteBilan(matricule: string) {
    return this.http.delete(`${this.url}/${matricule}`);
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } =
      this._state;

    // 1. sort
    let bilans = this.sort(this.fetchedBilans, sortColumn, sortDirection);

    // 2. filter
    bilans = bilans.filter((bilan) =>
      this.matches(bilan, searchTerm, this.pipe)
    );
    const total = bilans.length;

    // 3. paginate
    bilans = bilans.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );
    return of({ bilans, total });
  }

  private sort(
    bilans: BilanResponse[],
    column: SortColumn,
    direction: string
  ): BilanResponse[] {
    if (direction === '' || column === '') {
      return bilans;
    } else {
      return [...bilans].sort((a, b) => {
        const res = this.compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  private matches(bilan: BilanResponse, term: string, pipe: PipeTransform) {
    return bilan.matricule.toLowerCase().includes(term.toLowerCase());
  }

  private compare(v1: string | number | Date, v2: string | number | Date) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  get bilans$() {
    return this._bilans$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }
}
