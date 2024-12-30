import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-detail-eta',
  templateUrl: './order-detail-eta.component.html',
  styleUrls: ['./order-detail-eta.component.css']
})
export class OrderDetailEtaComponent implements OnInit {
  @Input() orderDetail: any;
  @Input() tempETA: any;
  @Input() eta: any;
  @Input() landscape: any;
  customnFlag: boolean=false;
  customTime: any;
  timeList: any = {
    time: [
      "12:00", "12:15", "12:30", "12:45", "1:00", "1:15", "1:30", "1:45",
      "2:00", "2:15", "2:30", "2:45", "3:00", "3:15", "3:30", "3:45",
      "4:00", "4:15", "4:30", "4:45", "5:00", "5:15", "5:30", "5:45",
      "6:00", "6:15", "6:30", "6:45", "7:00", "7:15", "7:30", "7:45",
      "8:00", "8:15", "8:30", "8:45", "9:00", "9:15", "9:30", "9:45",
      "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45",
    ]



  };
  @Output('setETA') setETAs: EventEmitter<any> = new EventEmitter();
  @Output('confirm') confirms: EventEmitter<any> = new EventEmitter();
  constructor() {
    //alert(this.timeList[0]);
  }

  ngOnInit() {
  }
  setETA(time:any) {
    this.tempETA = time;
    this.customnFlag = false;
    this.setETAs.emit(time);

  }
  setcustomETA() {
    this.tempETA = "0"
    this.customnFlag = true;
  }
  confirm(time:any) {
    console.log(time);
    this.confirms.emit(time);
    //this.
  }

}
