import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-extend-eta',
  templateUrl: './extend-eta.component.html',
  styleUrls: ['./extend-eta.component.css']
})
export class ExtendEtaComponent implements OnInit {
  @Input() extendPickupTemp:any;
  @Input() extendDeliveryTemp:any;
  @Output('resetETA') reset: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  resetETA() {
    this.reset.emit({
      extendPickupTemp: this.extendPickupTemp,
      extendDeliveryTemp: this.extendDeliveryTemp
    })
  }
  extendETA(ETA:any, TYPE:any) {

    if (ETA == 'default') {
      if (TYPE == 'pickup') {
        this.extendPickupTemp = 'default';

      }
      if (TYPE == 'delivery') {
        this.extendDeliveryTemp = 'default';
      }
    }
    if (ETA == '10') {
      if (TYPE == 'pickup') {
        this.extendPickupTemp = '10';
      }
      if (TYPE == 'delivery') {
        this.extendDeliveryTemp = '10';
      }
    }
    if (ETA == '20') {
      if (TYPE == 'pickup') {
        this.extendPickupTemp = '20';
      }
      if (TYPE == 'delivery') {
        this.extendDeliveryTemp = '20';
      }
    }
    if (ETA == '30') {
      if (TYPE == "pickup") {
        this.extendPickupTemp = '30';
      }
      if (TYPE == 'delivery') {
        this.extendDeliveryTemp = '30';
      }
    }

  }

}
