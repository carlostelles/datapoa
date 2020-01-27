import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PaginationModule} from 'ngx-bootstrap';

import {BusLinesComponent} from './bus-lines.component';
import {NgbdSortableHeader} from '../../shared/directives/sortable.directive';

@NgModule({
  declarations: [BusLinesComponent, NgbdSortableHeader],
  exports: [
    BusLinesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule.forRoot(),
  ]
})
export class BusLinesModule {
}
