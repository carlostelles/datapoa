import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {debounceTime, delay, map, switchMap, takeUntil, tap} from 'rxjs/operators';

import {SortDirection} from '../../shared/directives/sortable.directive';
import {environment} from '../../../environments/environment';
import {Line} from '../../shared/models/line';

interface SearchResult {
  lines: Line[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  lineType: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(operations: Line[], column: string, direction: string): Line[] {
  if (direction === '') {
    return operations;
  } else {
    return [...operations].sort((a, b) => {
      const col = column.split('.');
      let res;

      if (col.length > 1) {
        res = compare(a[col[0]][col[1]], b[col[0]][col[1]]);
      } else {
        res = compare(a[column], b[column]);
      }
      return direction === 'asc' ? res : -res;
    });
  }
}

@Injectable({
  providedIn: 'root'
})
export class BusLinesService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _lines$ = new BehaviorSubject<Line[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    lineType: 'o',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private httpClient: HttpClient) {
    this.getResults();
  }

  getResults() {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._lines$.next(result.lines);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get lines$() {
    return this._lines$.asObservable();
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
    this._set({page});
  }

  set pageSize(pageSize: number) {
    this._set({pageSize});
  }

  set searchTerm(searchTerm: string) {
    this._set({searchTerm});
  }

  set lineType(lineType: string) {
    this._set({lineType});
  }

  set sortColumn(sortColumn: string) {
    this._set({sortColumn});
  }

  set sortDirection(sortDirection: SortDirection) {
    this._set({sortDirection});
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    return this.httpClient
      .get<SearchResult>(environment.apiUrl, {
        params: {a: 'nc', p: '%' + this._state.searchTerm + '%', t: this._state.lineType}
      })
      .pipe(
        takeUntil(this._search$),
        map(value => {
          const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

          // 1. sort
          let lines = sort(value as any, sortColumn, sortDirection);
          const total = lines.length;

          // 2. paginate
          lines = lines.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

          return {lines, total};
        })
      );
  }
}
