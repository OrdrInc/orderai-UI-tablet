import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css']
})
export class MainTableComponent implements OnInit {
  @Input() landscape!: boolean;
  @Input() orderFlow!: boolean;
  @Input() data: any;
  @Input() noOrders: any;
  @Output('openOrder') openorders: EventEmitter<any> = new EventEmitter();
  // @Input() resturantName: string;

  constructor() { }

  ngOnInit() {
  }
  openOrder(ordernumber:any, order:any) {
    this.openorders.emit({ ordernumber: ordernumber, order: order });
  }
}
