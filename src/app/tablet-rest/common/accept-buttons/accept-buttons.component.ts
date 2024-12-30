import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-accept-buttons',
  templateUrl: './accept-buttons.component.html',
  styleUrls: ['./accept-buttons.component.css']
})
export class AcceptButtonsComponent implements OnInit {
  @Input() orderDetail: any;
  @Input() tempETA: any;
  @Input() landscape: any;
  @Output('acceptOrder') acceptOrders: EventEmitter<any> = new EventEmitter();
  @Output('closebutton') closebuttons: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  ngOnInit() {
    if (this.orderDetail.orderStatus.isFutureOrder) {
      this.tempETA = "F/O";
    }
  }
  closebutton() {
    this.closebuttons.emit();
  }
  acceptOrder(id:any, eta:any) {

    this.acceptOrders.emit({ id: id, eta: eta });

  }

}

