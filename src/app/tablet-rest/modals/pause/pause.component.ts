import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pause',
  templateUrl: './pause.component.html',
  styleUrls: ['./pause.component.css']
})
export class PauseComponent implements OnInit {
  @Output('pauses') pause: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  pauses() {
    this.pause.emit();
  }

}
