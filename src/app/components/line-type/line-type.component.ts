import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-line-type',
  templateUrl: './line-type.component.html',
  styleUrls: ['./line-type.component.scss']
})
export class LineTypeComponent implements OnInit {
  _type = 'o';
  @Output() type = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onType(type: string) {
    this._type = type;
    this.type.emit(type);
  }
}
