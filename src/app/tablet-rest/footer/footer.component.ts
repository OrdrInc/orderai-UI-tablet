import { Component, OnInit, Input,ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from './../../app.service';
import { NewService } from "./../../new.service";
import Pusher from "pusher-js";
@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent implements OnInit {
  @Input() landscape!:any;
  @Input() orderFlow:any;
  year:any;
  buttonsFlag = true;
  curPage = "";
  res:any;
  pusher: any;
  channel: any;
  audio: any;
  @ViewChild('boxhight') targetElement: any; 
  constructor(private router: Router,public service: AppService,private api:NewService) {}

  ngOnInit() {
    this.service.isBroadcastLockedMessage="";
    this.service.isFeedbackLockedMessage="";
    this.service.isCurbsideLockedMessage="";
    var str = window.location.pathname;
    this.res = str.split("/");
    this.curPage = this.res[1];
    var date = new Date();
    this.year = date.getFullYear();
    var payload={
      restId :"+1"+this.res[2]
     }
    
    this.api.cpFetchCounters(payload);
    var counter=this.api.getcpFetchCounters().subscribe((data) => {
     this.service.broadcastBadgeCount=parseInt(data.bcCounter);
     this.service.curbsideBadgeCount=parseInt(data.csCounter);
     this.service.feedbackBadgeCount=parseInt(data.fbCounter);
     this.service.textPOSBadgeCount=parseInt(data.textCounter);

     counter.unsubscribe();
    
     this.service.getInitalDetails(this.res[2]).subscribe(
      dataNew => {
        this.service.isBroadcast=dataNew.isBroadcast;
        this.service.isCurbSide=dataNew.isCurbside;
        this.service.isFeedback=dataNew.isFeedback;
        if(this.service.isBroadcast==false){
          this.service.isBroadcastLockedMessage="Email info@ordrai.com to add Broadcast module."
        }
        if(this.service.isFeedback==false && this.service.isCurbSide==false){
          this.service.isFeedbackLockedMessage="Add the Reviews  module for just $20/month.<br> Email info@ordrai.com for more information."
          this.service.isCurbsideLockedMessage="Add the  Curbside module for just $20/month.<br> Email info@ordrai.com for more information."
       
        }
        else{
          this.service.isFeedbackLockedMessage="Add the Reviews  module for just $20/month.<br> Email info@ordrai.com for more information."
          this.service.isCurbsideLockedMessage="Add the  Curbside module for just $20/month.<br> Email info@ordrai.com for more information."
        }
      })
     
    })
    this.pusher = new Pusher("8892259dee5062541bfb", {
      cluster: "us2",
      forceTLS: true,
    });
    this.channel = this.pusher.subscribe(this.res[2]);
    this.channel.bind("navbarSend", (data:any) => {
      this.playAudio();
      if (data.length == 0) {
       
      } else {
        this.service.broadcastBadgeCount=parseInt(data.bcCounter);
        this.service.curbsideBadgeCount=parseInt(data.csCounter);
        this.service.feedbackBadgeCount=parseInt(data.fbCounter);
        this.service.textPOSBadgeCount=parseInt(data.textCounter);  
      }
    });
   
  }
  playAudio() {
    this.audio = new Audio();
    this.audio.src = "../../../../assets/sounds/slow-spring-board.mp3";
    this.audio.load();
    this.audio.play();
  }
  goTo(page:any) {
    if (page == "feedback") {
     
      this.router.navigate(["/fb/" + this.res[2]]);
    }
    if (page == "broadcast") {
     
      this.router.navigate(["/broadcast/" + this.res[2]]);
    }
    if (page == "curbside") {
     
      this.router.navigate(["/curbside/" + this.res[2]]);
    }
    if (page == "rest") {
      this.router.navigate(["/rest/" + this.res[2]]);
    }
    if (page == "manage") {
      this.router.navigate(["/manage/" + this.res[2]]);
    }
  }
}
