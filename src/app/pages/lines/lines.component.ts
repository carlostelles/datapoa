import {Component} from '@angular/core';

@Component({
  selector: 'app-lines',
  templateUrl: './lines.component.html',
  styleUrls: ['./lines.component.scss']
})
export class LinesComponent {
  search = '';
  type = 'o';

  onSearch($event: string) {
    this.search = $event;
  }

  onType($event: string) {
    this.type = $event;
  }
}
