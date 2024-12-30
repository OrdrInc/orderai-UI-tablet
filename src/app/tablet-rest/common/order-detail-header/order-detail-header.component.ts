import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-detail-header',
  templateUrl: './order-detail-header.component.html',
  styleUrls: ['./order-detail-header.component.css']
})
export class OrderDetailHeaderComponent implements OnInit {
  @Input() orderDetail: any;
  @Output('refundClick') refundClicks: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  refundClick() {
    this.refundClicks.emit();
  }

}
