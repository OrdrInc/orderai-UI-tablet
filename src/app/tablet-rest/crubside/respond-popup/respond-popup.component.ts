import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-respond-popup',
  templateUrl: './respond-popup.component.html',
  styleUrls: ['./respond-popup.component.css']
})
export class RespondPopupComponent implements OnInit {
 @Input() timeJson:any;
 @Output('respond') resp: EventEmitter<any> = new EventEmitter();
 selectedTime:string=''
  constructor() { }
resend(){
  this.timeJson.isReply=false;
}
send(){
  var data={
   curbId:this.timeJson.curbId,
   selectedTime:this.selectedTime
  }
  
  this.resp.emit(data);
  this.selectedTime='';
}
close(){
  this.selectedTime='';
}
  ngOnInit() {
  }

}
