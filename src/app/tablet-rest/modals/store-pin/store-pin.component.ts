import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-store-pin',
  templateUrl: './store-pin.component.html',
  styleUrls: ['./store-pin.component.css']
})
export class StorePinComponent implements OnInit {
  @Output('pauses') pause: EventEmitter<any> = new EventEmitter();
  storePIN: any;
  @Input() extendeta:any;
  constructor() { }

  ngOnInit() {
  }
  pauses() {
    this.pause.emit(this.storePIN);
  }
}
