import {Component, Input, OnChanges, OnInit, QueryList, SimpleChange, ViewChildren} from '@angular/core';
import {Observable} from 'rxjs';
import {Line} from '../../shared/models/line';
import {BusLinesService} from './bus-lines.service';
import {NgbdSortableHeader, SortEvent} from '../../shared/directives/sortable.directive';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bus-lines',
  templateUrl: './bus-lines.component.html',
  styleUrls: ['./bus-lines.component.scss']
})
export class BusLinesComponent implements OnChanges {
  lines$: Observable<Line[]>;
  total$: Observable<number>;
  @Input() search = '';
  @Input() lineType: string;
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: BusLinesService,
              private router: Router) {
    this.lines$ = service.lines$;
    this.total$ = service.total$;
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }): void {
    this.service.lineType = this.lineType;
    this.service.searchTerm = this.search;
  }

  onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  onRouteLine(line) {
    this.router.navigate(['lines', line.id]);
  }
}
