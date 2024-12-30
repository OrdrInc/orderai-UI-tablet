import { Component, OnInit } from "@angular/core";
import { AppService } from "./../../app.service";
import { NewService } from "./../../new.service";
import { MatDialog } from "@angular/material/dialog";
import { StoreManageDialogComponent } from "./store-manage-dialog/store-manage-dialog.component";
import { PauseReasonPopupComponent } from "./pause-reason-popup/pause-reason-popup.component";
import { FeedbackHistoryComponent } from "./../feedback/feedback-history/feedback-history.component";
declare var $: any;
@Component({
  selector: "app-store-manage",
  templateUrl: "./store-manage.component.html",
  styleUrls: ["./store-manage.component.css"],
})
export class StoreManageComponent implements OnInit {
  id:any;
  resturantName:any;
  loading = false;
  pinVerified = false;
  storePinlengthMessage = false;
  storePIN = "";
  pinAttempt = 0;
  restId = "";
  sid = "";
  storedata:any;
  popHeader = "";
  popMessage = "";
  servicesFlag = false;
  textOrderVariable = "";
  manageStoreServicesData: any;
  deliveryObjPause = {
    db: "cb_minTotalForDelivery",
    item: "Delivery Min ($)",
    response: "1000.00",
    type: "text",
  };
  deliveryObjResume = {
    db: "cb_minTotalForDelivery",
    item: "Delivery Min ($)",
    response: "12.00",
    type: "text",
  };
  constructor(
    private service: AppService,
    private api: NewService,
    public dialog: MatDialog
  ) {}
  pauseresumeServices() {
    this.servicesFlag = true;
    this.manageServices();
  }
  feedbackHistory() {
    var payload = {
      restName: this.resturantName,
      restId: this.restId,
    };
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(FeedbackHistoryComponent, {
      width: "99%",
      height: "100%",
      maxWidth: "unset",
      data: payload,
    });
    dialogRef.afterClosed().subscribe((result) => {
      // //console.log('The dialog was closed');
    });
  }
  ngOnInit() {
    var str = window.location.href;
    var res = str.split("manage/");
    this.id = res[1];
    this.loading = true;
    this.service.getrestInfo(this.id).subscribe((data) => {
      this.loading = false;
      this.resturantName = data[0].friendlyName;
      this.restId = data[0].restId;
      this.api.resturantName = this.resturantName;
      let name = this.resturantName;
      let sid = name.split(" ");
      this.sid = sid[0];
      this.sid = this.sid.replace("-", "");
      console.log(this.sid);
      (error:any) => {
        this.loading = false;
        console.log(error);
      };
    });
  }
  storePinString(data:any) {
    data = data.toString();
    return data;
  }
  refund() {
    var data = {
      refund: true,
      data: this.storedata,
      id: "+1" + this.id,
    };
    this.openDialog(data);
  }

  addNotes(notes: any) {
    let id = this.sid;
    let logPayload = {
      emailId: 'karthi92.ind@gmail.com',
      //storeId: 'MID26',
      storeId: id,
      info: "4ordr.com_" + notes,
      noteType: "note",
    };
    this.api.addNotesNew(logPayload);
  }
  addLogs(serviceType: any, type: any) {
    let id = this.sid;
    let logPayload = {
      emailId: 'karthi92.ind@gmail.com',
      // storeId: 'MID26',
      storeId: id,
      info: "4ordr.com_" + serviceType + "-" + type,
      noteType: "log",
    };
    this.api.addNotesNew(logPayload);
  }
  manageServices() {
    this.loading = true;
    this.api.manageStoreServices("+1" + this.id);
    this.api.manageStoreServicesNew("+1" + this.id);
    let serviceDetail = this.api
      .getmanageStoreServicesNew()
      .subscribe((data: any) => {
        console.log(data);
        this.loading = false;
        this.manageStoreServicesData = data;
      });
  }
  actionDelivery(serviceName: any, item: any) {
    const dialogRef = this.dialog.open(PauseReasonPopupComponent, {
      width: "35%",
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (
        this.api.pauseUnpausePopupData.notes == "" &&
        this.api.pauseUnpausePopupData.notifyFlag == ""
      ) {
      } else {
        let text: any;
        if (item.response == false) {
          text = " delivery paused";
        } else {
          text = "delivery resumed";
        }

        let payload = {
          db_key: item.db,
          db_val: !item.response,
          table: item.table,
        };
        this.loading = true;
        this.api.newDashboardDetailUpdateJson("+1" + this.id, payload);
        let up = this.api.getnewDahboardDetailUpdateJson().subscribe((info) => {
          if (this.api.pauseUnpausePopupData.notifyFlag == true) {
            this.loading = false;
            let action: any;
            if (item.response == false) {
              action = "pausing";
            } else {
              action = "resuming";
            }
            let message =
              "We are currently " +
              action +
              " the " +
              serviceName +
              " delivery service for your store - " +
              this.sid;
            this.api.informManagersNew("+1" + this.id, serviceName, message);
          }
          this.addNotes1(
            serviceName +
              "_" +
              text +
              " - " +
              this.api.pauseUnpausePopupData.notes
          );
          this.addLogs1(serviceName, text);
          this.loading = false;
          this.manageServices();
        });
      }
    });
  }
  action(serviceName: any, response: any) {
    const dialogRef = this.dialog.open(PauseReasonPopupComponent, {
      width: "35%",
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (
        this.api.pauseUnpausePopupData.notes == "" &&
        this.api.pauseUnpausePopupData.notifyFlag == ""
      ) {
      } else {
        let text: any;
        this.loading = true;
        if (response == false) {
          text = "resumed";
        } else {
          text = "paused";
        }
        this.api.textTalkPauseUnpause(
          "+1" + this.id,
          serviceName.toLowerCase()
        );
        let pauseCall = this.api.gettextTalkPauseUnpause().subscribe((x) => {
          if (this.api.pauseUnpausePopupData.notifyFlag == true) {
            this.loading = false;
            let action: any;
            if (response == false) {
              action = "resuming";
            } else {
              action = "pausing";
            }
            let message =
              "We are currently " +
              action +
              " the " +
              serviceName +
              " ordering service for your store - " +
              this.sid;
            this.api.informManagersNew("+1" + this.id, serviceName, message);
          }
          this.addNotes1(
            serviceName +
              "_" +
              text +
              " - " +
              this.api.pauseUnpausePopupData.notes
          );
          this.addLogs1(serviceName, text);
          this.manageServices();
          pauseCall.unsubscribe();
        });
      }
    });
  }
  pauseUnpauseTest(item: any) {
    for (let i = 0; i < item.data.length; i++) {
      if (item.data[i].label === "isAvailable") {
        if (!item.data[i].response) {
          this.showlock = true;
          return true;
        } else {
          this.showlock = false;
          return false;
        }
      }
    }
    this.showlock = false;
    return false;
  }
  deliveryDisable(item: any) {
    for (let i = 0; i < item.data.length; i++) {
      if (item.data[i].label === "isActive") {
        if (!item.data[i].response) {
          return true;
        } else {
          return false;
        }
      }
    }
    return true;
  }
  deliveryTest(item: any) {
    for (let i = 0; i < item.data.length; i++) {
      if (item.data[i].label === "isActive") {
        if (!item.data[i].response) {
          return "Delivery can be Paused/Resumed only when service is active.";
        } else {
          return "";
        }
      }
    }
    return "";
  }

  addNotes1(notes: any) {
   
    let logPayload = {
      email_id: 'karthi92.ind@gmail.com',
      //storeId: 'MID26',
      store_code: this.sid,
      info: "4ordr.com_" + notes,
      note_type: "note",
    };
    this.api.addNotesNewUpdated(logPayload);
  }
  addLogs1(serviceType: any, type: any) {
   
    let logPayload = {
      email_id: 'karthi92.ind@gmail.com',
      // storeId: 'MID26',
      store_code: this.sid,
      info: "4ordr.com_" + serviceType + "-" + type,
      note_type: "log",
    };
    this.api.addNotesNewUpdated(logPayload);
  }
  showLock(item: any) {
    for (var i = 0; i < item.data.length; i++) {
      if (item.data[i].label == "isAvailable") {
        if (!item.data[i].response) {
          return true;
        }
      }
    }
    return false;
  }
  showlock = false;

  extendPin() {
    this.storePinlengthMessage = false;
    this.loading = true;
    if (this.storePIN.toString().length < 4) {
      this.loading = false;
      this.storePinlengthMessage = true;
    } else {
      var pin = this.service.checkPin("+1" + this.id, this.storePIN).subscribe(
        (data) => {
          this.loading = false;
          if (data.pinStatus == true) {
            this.pinAttempt = 0;
            this.pinVerified = true;
            this.manageServices();

            pin.unsubscribe();
            this.loadData();
          } else {
            this.pinAttempt = this.pinAttempt + 1;
            if (this.pinAttempt > 3) {
            }
          }
        },
        (error) => {
          this.loading = false;
          console.log(error);
        }
      );
    }
  }
  loadData() {
    this.loading = true;
    this.api.cpFetchManageDetail(this.sid.toUpperCase());
    this.api.getManageDetails().subscribe((storeResponse) => {
      this.loading = false;
      console.log(storeResponse);
      this.storedata = storeResponse;
    });
  }
  async textOrders() {
    this.loading = true;
    $("#textpopupPaused").modal("hide");
    $("#textpopupResumed").modal("hide");
    this.api.PauseStore("+1" + this.id);
    let pause = this.api.getPause().subscribe((x) => {
      pause.unsubscribe();
      if (this.storedata.actionBtnArr[0].item == "Resume Store") {
        $("#textpopupResumed").modal("show");
      } else {
        $("#textpopupPaused").modal("show");
      }
      this.loadData();
    });
  }
  deliveryOrders() {
    $("#deliverypopupPaused").modal("hide");
    $("#deliverypopupResumed").modal("hide");
    if (this.storedata.actionBtnArr[1].item === "Resume Delivery") {
      $("#deliverypopupResumed").modal("show");
      this.updateKey(this.deliveryObjResume);
    }
    if (this.storedata.actionBtnArr[1].item === "Pause Delivery") {
      $("#deliverypopupPaused").modal("show");
      this.updateKey(this.deliveryObjPause);
    }
  }
  async updateKey(res:any) {
    const dbKeyArr = res.db.split(".");
    if (res.response == "YES") {
      res.response = true;
    }
    if (res.response == "NO") {
      res.response = false;
    }
    await this.api.cpUpdateManageDetail("+1" + this.id, dbKeyArr, res.response);
    //console.log('inside Updatekey')
    //console.log(res)
    const note = `updated ${res.db}`;
    this.api.addNotes(
      "karthik92.ind@gmail.com",
      this.sid.toUpperCase(),
      note,
      "log"
    );
    // this.cancelEdit();

    var subscription = this.api.updateManageDetails().subscribe((data) => {
      subscription.unsubscribe();
      this.loadData();
    });
  }
  items() {
    this.loading = true;
    this.api.itemsStock("1" + this.id);
    this.api.getitemsStock().subscribe((x) => {
      //console.log(x);
      var data = {
        items: true,
        data: x.items,
        id: "+1" + this.id,
      };
      this.loading = false;
      this.openDialog(data);
    });
  }
  modifiers() {
    this.loading = true;
    this.api.modifiersStock("1" + this.id);
    this.api.getmodifiersStock().subscribe((x) => {
      //console.log(x)
      this.loading = false;
      var data = {
        modifiers: true,
        data: x.modifiers,
        id: "+1" + this.id,
      };

      this.openDialog(data);
    });
  }
  storeHours() {
    var data = {
      storehours: true,
      data: this.storedata,
      id: "+1" + this.id,
    };
    this.openDialog(data);
  }
  storeOperation() {
    var data = {
      storeoperation: true,
      data: this.storedata,
      id: "+1" + this.id,
    };
    this.openDialog(data);
  }
  testStore() {
    var data = {
      testStore: true,
      data: this.storedata,
      id: "+1" + this.id,
    };
    this.openDialog(data);
  }
  openDialog(Arg:any) {
    this.dialog.closeAll();
    const dialogRef = this.dialog.open(StoreManageDialogComponent, {
      width: "99%",
      height: "100%",
      maxWidth: "unset",
      data: Arg,
    });
    dialogRef.afterClosed().subscribe((result) => {
      // //console.log('The dialog was closed');
    });
  }
}
