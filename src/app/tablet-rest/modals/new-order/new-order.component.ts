import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  @Input() orderCount:any;
  @Output('clk') clicked: EventEmitter<any> = new EventEmitter();
  constructor() {
    console.log("new order alert");
  }

  ngOnInit() {
  }
  clickss() {
    this.clicked.emit();
  }

}
