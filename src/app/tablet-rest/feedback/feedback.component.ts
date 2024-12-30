import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AppService } from "./../../app.service";
import { NewService } from "./../../new.service";
import Pusher from "pusher-js";
import { MatDialog } from "@angular/material/dialog";
import {FeedbackHistoryComponent} from './feedback-history/feedback-history.component'
import {FeedbackDetailComponent} from './feedback-detail/feedback-detail.component'
import { from } from "rxjs";
declare var $: any;
@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.css"],
})
export class FeedbackComponent implements OnInit {
  @ViewChild("audioOption") audioPlayerRef!: ElementRef;
  constructor(public service: AppService, private api: NewService, public dialog: MatDialog) {
    this.service.isBroadcastLockedMessage="";
    this.service.isFeedbackLockedMessage="";
    this.service.isCurbsideLockedMessage="";
  }
  id:any;
  resturantName:any;
  feedbackcount = 0;
  loading = false;
  restId = "";
  displayData:any ;
  pusher: any;
  channel: any;
  audio: any;
  selectedRow:any;
  selectedResponse='';
  text='';
  ngOnInit() {
   
    var str = window.location.href;
    var res = str.split("fb/");
    this.id = res[1];
    this.loading = true;
    this.service.getrestInfo(this.id).subscribe((data) => {
      this.loading = false;
      this.resturantName = data[0].friendlyName;
      this.restId = data[0].restId;
      //this.service.isFeedback=data[0].isFeedback;
     
      this.getAlldata(data[0].restId, data[0].storeDate);
      (error:any) => {
        this.loading = false;
        console.log(error);
      };
    });
    
    this.pusher = new Pusher("8892259dee5062541bfb", {
      cluster: "us2",
      forceTLS: true,
    });
    this.channel = this.pusher.subscribe(this.id);
    this.channel.bind("feedbackSend", (data:any) => {
      console.log(data);
      if (data.length == 0) {
        this.refresh();
      } else {
        this.pushData(data);
      }
    });
  }
  refresh() {
    window.location.reload();
  }
  getAlldata(restId:any, date:any) {
    var payload = {
      restId: restId,
      storeDate:date,
    };
   
    this.api.cpFeedbackRefresh(payload);
    this.api.getcpFeedbackRefresh().subscribe((data) => {
      if (data.result.length > 0) {
        this.displayData = data.result;
        this.feedbackCount();
        this.displayData = this.putAllUndoneAtBottom(this.displayData);
        
        console.log(this.displayData);
      }
      else{
        this.displayData=[];
      }
    });
  }
  pushData(data:any) {
    var pusherData = data;
    pusherData["timer"] = 20;
    pusherData["border"] = "black-back";
    console.log(pusherData);
    this.push(pusherData);
  }
  feedbackHistory(){
    var payload={
      restName: this.resturantName,
      restId:this.restId
    }
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(FeedbackHistoryComponent, {
      width: "99%",
      height: "100%",
      maxWidth: "unset",
      data:payload
    });
    dialogRef.afterClosed().subscribe((result) => {
      // //console.log('The dialog was closed');
    });
  }
  openFeedbackDetail(data:any){
    this.dialog.closeAll();
    data["storeName"]=this.resturantName
    const dialogRef = this.dialog.open(FeedbackDetailComponent, {
      width: "70%",
      height: "70%",
      maxWidth: "unset",
      data:data,
      
    });
    dialogRef.afterClosed().subscribe((result) => {
      // //console.log('The dialog was closed');
    });
  }
  push(data:any) {
    this.displayData.unshift(data);
   // this.displayData = this.putAllUndoneAtBottom(this.displayData);
    this.feedbackcount = this.feedbackcount + 1;
    for (var k = 0; k < this.displayData.length; k++) {
      if (this.displayData[k].timer != 0) {
        this.startTimer(this.displayData[k]);
      }
    }
  //  this.playAudio();
  }
  startTimer(data:any) {
    var refreshIntervalId = setInterval(() => {
      if (data.timer > 0) {
        data.timer--;
      } else if (data.timer == 0) {
        for (var z = 0; z < this.displayData.length; z++) {
          if (this.displayData[z] == data) {
            this.displayData[z].border = "black-border";
          }
        }
        clearInterval(refreshIntervalId);
      } else if (data.timer == -1) {
        clearInterval(refreshIntervalId);
      }
    }, 1000);
  }
  formatPhone(x:any) {
    // console.log('format phone')
    const val = x.split("");
    // console.log(val)
    const displayNo = `(${val[2]}${val[3]}${val[4]}) ${val[5]}${val[6]}${val[7]}-${val[8]}${val[9]}${val[10]}${val[11]}`;
    return displayNo;
  }
  changeticketId(a:any){

  }
  done(row:any) {
    this.selectedResponse='';
    this.selectedRow=row;
    if(!row.fStatus){
    $("#feedbackpop").modal("show");
    }
    else{
      row.fStatus = !row.fStatus;
    
      this.text='';
      this.loading=true;
      var payload ={
         fid : row.fid, 
         fStatus : row.fStatus, 
         text : this.text, 
         restId :row.custId,
         custId :row.restId 
        }
        this.api.cpFeedbackAck(payload);
        let undone=this.api.getcpFeedbackAck().subscribe((data) => {
          this.loading = false;
          if (data.status == 200) {
            this.service.feedbackBadgeCount= this.service.feedbackBadgeCount+1;
            this.displayData = this.putAllUndoneAtBottom(this.displayData);
            this.feedbackCount();
            undone.unsubscribe();
          }
        });
    }
   // 
    //this.displayData = this.putAllUndoneAtBottom(this.displayData);
    //this.feedbackCount();
  }
  donecall(){
   
    this.loading=true;
    var row =this.selectedRow
    row.fStatus=!row.fStatus;
    if(this.selectedResponse=='btn1'){
     this.text='1-2'
    }
    else  if(this.selectedResponse=='btn2'){
      this.text='2-4'
     }
    var payload ={
      fid : row.fid, 
      fStatus : row.fStatus, 
      text : this.text, 
      restId :row.custId,
      custId :row.restId 
     }
     
      this.api.cpFeedbackAck(payload);
     let done= this.api.getcpFeedbackAck().subscribe((data) => {
        this.loading = false;
        if (data.status == 200) {
          this.service.feedbackBadgeCount= this.service.feedbackBadgeCount-1;
          $("#feedbackpop").modal("hide");
          this.displayData = this.putAllUndoneAtBottom(this.displayData);
       
          this.feedbackCount();
          $("#feedbackSucess").modal("show");
          done.unsubscribe();
          console.log("hello"+this.displayData)
        }
      });
  }
  putAllUndoneAtBottom(data:any) {
    var done = [];
    var undone = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].fStatus == true) {
        done.push(data[i]);
      } else if (data[i].fStatus == false) {
        undone.push(data[i]);
      }
    }
    var displayData = undone.concat(done);
    for(var i=0;i<this.displayData.length;i++){
      if(this.displayData[i].isDefaultFeedback==undefined){
        this.displayData[i]["isDefaultFeedback"]=true;
      }
    }
    return displayData;
  }
  feedbackCount() {
    this.feedbackcount = 0;
    for (var i = 0; i < this.displayData.length; i++) {
      if (this.displayData[i].fStatus == false) {
        this.feedbackcount = this.feedbackcount + 1;
      }
    }
  }
}
