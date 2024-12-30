import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { AppService } from './../../../app.service';
@Component({
  selector: 'app-ticket-id-popup',
  templateUrl: './ticket-id-popup.component.html',
  styleUrls: ['./ticket-id-popup.component.css']
})
export class TicketIdPopupComponent implements OnInit {
  @Input() ticketId!:any;
  @Output('save') saves: EventEmitter<any> = new EventEmitter();
  displayTicketId:any;
  constructor(private service: AppService) { 
  }
  
  ngOnInit() {
  
  }
  close(){
    this.ticketId=null;
  }
  saveTicketId(){
   this.saves.emit(this.ticketId);
   this.ticketId=null; 
  }
}
