import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { AppService } from "./../../app.service";
import { Howl, Howler } from "howler";
import Pusher from "pusher-js";
declare var $: any;
@Component({
  selector: "app-crubside",
  templateUrl: "./crubside.component.html",
  styleUrls: ["./crubside.component.css"],
})
export class CrubsideComponent implements OnInit {
  @ViewChild("audioOption") audioPlayerRef!: ElementRef;
  id;
  checkedInCars = 0;
  resturantName:any;
  ticketId:any;
  audio: any;
  selectedrow:any;
  displayData:any;
  curbId:any;
  year:any;
  pusher: any;
  custId: any;
  restId: any;
  channel: any;
  timeJson: any = {
    isReply: false,
    repliedValue: "",
    btnValue: [],
  };
  restIdNew='';
  data = [
    /* {
    ticketId:'127',
    time:'9:25',
    name:'Smantha Susan Stevenson MBBS',
    phone:'(248)-767-7673',
    notes:'Black Hyundai Elantra ,Ending with #2222, Phone no (999)-000-9999, Hazard lights ON. ',
    isDone:true,
    border:''
  },
  {
    ticketId:'10',
    time:'9:22',
    name:'Aaron',
    phone:'(248)-767-7673',
    notes:'White Jeep Cherokee ',
    isDone:false,
    border:''
  }*/
  ];
  constructor(public service: AppService) {
    this.service.isBroadcastLockedMessage="";
    this.service.isFeedbackLockedMessage="";
    this.service.isCurbsideLockedMessage="";
    var str = window.location.href;
    var res = str.split("curbside/");
    this.id = res[1];
    this.service.getrestInfo(this.id).subscribe((data) => {
      this.resturantName = data[0].friendlyName;
      // data[0].storeDate
      this.restIdNew=data[0].restId;
      //this.service.isCurbSide=data[0].isCurbSide;
      this.getAlldata(data[0].restId, data[0].storeDate);
      (error:any) => {
        console.log(error);
      };
    });
    this.pusher = new Pusher("8892259dee5062541bfb", {
      cluster: "us2",
      forceTLS: true,
    });
    this.channel = this.pusher.subscribe(this.id);
    this.channel.bind("curbSend", (data:any) => {
      console.log(data);
      if (data.length == 0) {
        this.refresh();
      } else {
        this.pushData(data);
      }
    });
  }
  getAlldata(restId:any, storeDate:any) {
    this.service.getOneDayRecord(restId, storeDate).subscribe((data) => {
      console.log(data);
      this.data = data;
      this.displayData = this.putAllUndoneAtBottom(this.data);
      for (var i = 0; i < this.displayData.length; i++) {
        this.displayData[i]["border"] = "black-border";
      }
      this.calculateCars();
    });
  }
  getFirstName(name:any, type:any) {
    if (type == "firstname") {
      let x = name.split(" ", 1);
      return x;
    } else {
      let x = name.split(" ", 1);
      let y = name.substring(x[0].length);
      if (y.length == 0) {
        y = "";
      }
      return y;
    }
  }
  changeticketId(row:any) {
    this.selectedrow = row;
    if (row.OrderInfo.ticketId == "*") {
      this.ticketId = null;
    } else {
      this.ticketId = row.OrderInfo.ticketId;
    }
    this.curbId = row.CurbId;
    $("#ticketIdPop").modal("show");
  }
  save($event:any) {
    this.service.updateTicketId(this.curbId, $event).subscribe((data) => {
      if (data.msg == true) {
        for (var i = 0; i < this.displayData.length; i++) {
          if (this.selectedrow.CurbId == this.displayData[i].CurbId) {
            this.displayData[i].OrderInfo.ticketId = $event;
          }
        }
      }
    });
    $("#ticketIdPop").modal("hide");
  }
  calculateCars() {
    this.checkedInCars = 0;
    for (var i = 0; i < this.displayData.length; i++) {
      if (this.displayData[i].status == false) {
        this.checkedInCars = this.checkedInCars + 1;
      }
    }
  }

  pushData(data:any) {
    var pusherData = data;
    pusherData["timer"] = 20;
    pusherData["border"] = "black-back";
    console.log(pusherData);
    this.push(pusherData);
  }

  putAllUndoneAtBottom(data:any) {
    var done = [];
    var undone = [];
    for (var i = 0; i < data.length; i++) {
      if (data[i].status == true) {
        done.push(data[i]);
      } else if (data[i].status == false) {
        undone.push(data[i]);
      }
    }
    var displayData = undone.concat(done);
    return displayData;
  }
  respond(row:any) {
    this.curbId = row.CurbId;
    this.custId = row.CustomerId;
    this.restId = row.RestaurantId;
    //make backend call after success show this;
    this.service.getresponseInfo(this.curbId).subscribe((data) => {
      this.timeJson = data;
      $("#respondPop").modal("show");
    });
  }
  respondSave($event:any) {
    console.log($event);
    this.service
      .updateresponseInfo(
        $event.curbId,
        $event.selectedTime,
        this.restId,
        this.custId
      )
      .subscribe((data) => {
        $("#respondPop").modal("hide");
        $("#etaupdatesucess").modal("show");
        setTimeout(function () {
          $("#etaupdatesucess").modal("hide");
        }, 5000);
      });
  }
  done(row:any, status:any) {
    if (status == "done") {
      var value = true;
      this.service.curbsideBadgeCount= this.service.curbsideBadgeCount-1;
    } else {
      value = false;
      this.service.curbsideBadgeCount= this.service.curbsideBadgeCount+1;
    }
    this.service.tabletDoneUndoneTogle(row.CurbId, value,this.restIdNew).subscribe((data) => {
      if (data.msg == true) {
        for (var i = 0; i < this.displayData.length; i++) {
          if (this.displayData[i].CurbId == row.CurbId) {
            this.displayData[i].status = !this.displayData[i].status;
            this.displayData[i].border = "black-border";
          }
        }
        this.displayData = this.putAllUndoneAtBottom(this.displayData);
        this.calculateCars();
      }
    });
  }

  push(data:any) {
    this.displayData.push(data);
    this.displayData = this.putAllUndoneAtBottom(this.displayData);
    this.calculateCars();
    for (var k = 0; k < this.displayData.length; k++) {
      if (this.displayData[k].timer != 0) {
        this.startTimer(this.displayData[k]);
      }
    }
   // this.playAudio();
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
  refresh() {
    window.location.reload();
  }
  ngOnInit() {
    
    this.displayData = this.putAllUndoneAtBottom(this.data);
    for (var i = 0; i < this.displayData.length; i++) {
      if (this.displayData[i].isDone == false) {
        this.checkedInCars = this.checkedInCars + 1;
      }
    }
  }
}
