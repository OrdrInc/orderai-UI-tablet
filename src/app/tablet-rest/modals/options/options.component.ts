import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppService } from '../../../app.service';
declare var $: any;
@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  extendeta: boolean = false;
  smallload: boolean = false;
  storemetrics: any = [];
  @Input() id:any;
  @Input() storeDate:any;
  @Input() restStatus:any;
  @Output('pauses') pause: EventEmitter<any> = new EventEmitter();
  @Output('extendETAPopup') extendETAPopups: EventEmitter<any> = new EventEmitter();
  constructor(private service: AppService) { }

  ngOnInit() {
  }
  contactus() {
    $('#contact-modal').modal('show');
    $('#modalPoll-1').modal('hide');
  }
  extendETAPopup() {
    this.extendETAPopups.emit();
    //this.extendeta = true;
    //$('#pin-modal').modal('show');
    //$('#modalPoll-1').modal('hide');
    //$('#extendeta').modal('show');
  }
  pauses() {
    console.log();
    this.pause.emit();
  }
  storeReport() {

    $('#storeReport').modal('show');
    $('#modalPoll-1').modal('hide');
    this.smallload = true;
    this.service.storeReport(this.id, this.storeDate).subscribe(
      data => {
        console.log(data);
        this.storemetrics = data;
        this.smallload = false;

      },

      error => {
        console.log(error);
      });

  }

}
