import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";
import { Observable } from "rxjs";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable()
export class NewService {
  address = "https://www.ordradminbk.com/";
  address1 = "https://www.tutalec.com/";
  serviceAddress = "https://service.ordrai.com/";
  reportsAddress = "https://admin.ordrai.com/"
  resturantName = "";
  private manageDetails = new Subject<any>();
  private postStock = new Subject<any>();
  private updateManage = new Subject<any>();
  private pauseData = new Subject<any>();
  private postTestOrdr = new Subject<any>();
  private ipData = new Subject<any>();
  private controlData = new Subject<any>();
  private broadcastMessageData = new Subject<any>();
  private broadcastAckData = new Subject<any>();
  private broadcastRefreshData = new Subject<any>();
  private feedbackAckData = new Subject<any>();
  private feedbackRefreshData = new Subject<any>();
  private fetchCountersData = new Subject<any>();
  private refundData = new Subject<any>();
  private feedbackHistoryData = new Subject<any>();
  private feedbackCSVData = new Subject<any>();
  private finalRefundNewData = new Subject<any>();
  private chargeCustomerData = new Subject<any>();
  private moreinfo = new Subject<any>();
  constructor(private http: HttpClient) {}
  getfinalRefundNew() {
    return this.finalRefundNewData.asObservable();
  }
  getfeedbackHistory() {
    return this.feedbackHistoryData.asObservable();
  }
  getManageDetails() {
    return this.manageDetails.asObservable();
  }
  getStock() {
    return this.postStock.asObservable();
  }
  updateManageDetails() {
    return this.updateManage.asObservable();
  }
  getPause() {
    return this.pauseData.asObservable();
  }
  getTestorder() {
    return this.postTestOrdr.asObservable();
  }
  getIP() {
    return this.ipData.asObservable();
  }
  getcpcontrolData() {
    return this.controlData.asObservable();
  }
  getcpgetBroadcastMessage() {
    return this.broadcastMessageData.asObservable();
  }
  getcpBroadcastAck() {
    return this.broadcastAckData.asObservable();
  }
  getcpBroadcastRefresh() {
    return this.broadcastRefreshData.asObservable();
  }
  getcpFeedbackAck() {
    return this.feedbackAckData.asObservable();
  }
  getcpFeedbackRefresh() {
    return this.feedbackRefreshData.asObservable();
  }
  getcpFetchCounters() {
    return this.fetchCountersData.asObservable();
  }
  getcpRefund() {
    return this.refundData.asObservable();
  }
  getfeedbackCSV() {
    return this.feedbackCSVData.asObservable();
  }
  getchargeCustomer() {
    return this.chargeCustomerData.asObservable();
  }
  getcpUsingOrderId() {
    return this.moreinfo.asObservable();
  }
  cpUsingOrderId(orderId:any) {
    let cpUsingOrdrIdPacket = JSON.stringify({ orderId: orderId });
    const localAddress = "https://tutalec.com/orderInfo";
    this.http
      .post<any>(localAddress, cpUsingOrdrIdPacket, httpOptions)
      .subscribe((data) => {
        this.moreinfo.next(data);
      });
  }
  chargeCustomer(data:any) {
    var pack = JSON.stringify(data);
    const localAddress = `${this.address}upchargeOrder`;
    this.http.post<any>(localAddress, pack, httpOptions).subscribe(
      (data) => {
        this.chargeCustomerData.next(data);
      },
      (data: HttpErrorResponse) => {
        this.chargeCustomerData.next(data);
      }
    );
  }
  finalRefundNew(data:any) {
    var pack = JSON.stringify(data);
    const localAddress = `${this.address}refundOrders`;
    this.http.post<any>(localAddress, pack, httpOptions).subscribe(
      (data) => {
        this.finalRefundNewData.next(data);
      },
      (data: HttpErrorResponse) => {
        this.finalRefundNewData.next(data);
      }
    );
  }
  feedbackCSV(fromDate:any, toDate:any, restId:any, storecode:any, category:any) {
    if (category == "all") {
      var localAddress:any =
        this.address +
        "feedback/download/store?fromDate=" +
        fromDate +
        "&toDate=" +
        toDate +
        "&restId=" +
        restId +
        "&storeCode=" +
        storecode;
    } else if (category != "all") {
      var localAddress:any =
        this.address +
        "feedback/download/store?fromDate=" +
        fromDate +
        "&toDate=" +
        toDate +
        "&restId=" +
        restId +
        "&storeCode=" +
        storecode +
        "&category=" +
        category;
    }
    this.http.get<any>(localAddress).subscribe(
      (data) => {
        this.feedbackCSVData.next(data);
        // console.log(data);
      },
      (err: HttpErrorResponse) => {
        window.open(localAddress, "_blank");
      }
    );
  }
  feedbackHistory(data:any) {
    var pack = JSON.stringify(data);
    const localAddress = `${this.address}feedback/detailReport/store`;
    this.http.post<any>(localAddress, pack, httpOptions).subscribe((data) => {
      this.feedbackHistoryData.next(data);
    });
  }
  cpRefund(data:any) {
    var refund = JSON.stringify(data);
    const localAddress = `${this.address}updateRefunds`;
    this.http.post<any>(localAddress, refund, httpOptions).subscribe((data) => {
      this.refundData.next(data);
    });
  }
  cpFetchCounters(data:any) {
    var fetchCounters = JSON.stringify(data);
    const localAddress = `${this.address1}fetchCounters`;
    this.http
      .post<any>(localAddress, fetchCounters, httpOptions)
      .subscribe((data) => {
        this.fetchCountersData.next(data);
      });
  }
  cpFeedbackRefresh(data:any) {
    var feedbackRefresh = JSON.stringify(data);
    const localAddress = `${this.address1}getFbDayRecord`;
    this.http
      .post<any>(localAddress, feedbackRefresh, httpOptions)
      .subscribe((data) => {
        this.feedbackRefreshData.next(data);
      });
  }
  cpFeedbackAck(data:any) {
    var feedbackAck = JSON.stringify(data);
    const localAddress = `${this.address1}updateFbAction`;
    this.http
      .post<any>(localAddress, feedbackAck, httpOptions)
      .subscribe((data) => {
        this.feedbackAckData.next(data);
      });
  }
  cpBroadcastRefresh(data:any) {
    var broadcastRefresh = JSON.stringify(data);
    const localAddress = `${this.address1}bcFetchOneDay`;
    this.http
      .post<any>(localAddress, broadcastRefresh, httpOptions)
      .subscribe((data) => {
        this.broadcastRefreshData.next(data);
      });
  }
  cpBroadcastAck(data:any) {
    var broadcastAck = JSON.stringify(data);
    const localAddress = `${this.address1}acknMessage`;
    this.http
      .post<any>(localAddress, broadcastAck, httpOptions)
      .subscribe((data) => {
        this.broadcastAckData.next(data);
      });
  }
  cpgetBroadcastMessage(data:any) {
    var broadcastMessage = JSON.stringify(data);
    const localAddress = `${this.address1}getMessage`;
    this.http
      .post<any>(localAddress, broadcastMessage, httpOptions)
      .subscribe((data) => {
        this.broadcastMessageData.next(data);
      });
  }
  cpcontrolData(data:any) {
    var refundInitate = JSON.stringify(data);
    const localAddress = `${this.address}searchOrders`;
    this.http
      .post<any>(localAddress, refundInitate, httpOptions)
      .subscribe((data) => {
        this.controlData.next(data);
      });
  }
  cpRemoveStoreHours(rid:any, dbkey:any) {
    const cpRemoveHours = JSON.stringify({ restId: rid, dbkey: dbkey });
    const localAddress = `${this.address}removeStoreHours`;
    this.http
      .post<any>(localAddress, cpRemoveHours, httpOptions)
      .subscribe((data) => console.log());
  }
  cpAddStoreHours(rid:any, dbkey:any, dbVal:any) {
    const cpAddHours = JSON.stringify({
      restId: rid,
      dbkey: dbkey,
      dbVal: dbVal,
    });
    const localAddress = `${this.address}addStoreHours`;
    this.http
      .post<any>(localAddress, cpAddHours, httpOptions)
      .subscribe((data) => console.log());
  }
  checkIPV1(ip:any) {
    const cpIPPacket = JSON.stringify({ ip: ip });
    const localAddress = `${this.address}checkIPv1`;
    this.http
      .post<any>(localAddress, cpIPPacket, httpOptions)
      .subscribe((data) => {
        this.ipData.next(data);
      });
  }
  testOrder(rid:any, testCase:any, actionItem:any) {
    const testPacket = JSON.stringify({
      restId: rid,
      custText: testCase,
      actionItem: actionItem,
    });
    // console.log(testPacket);
    const localAddress = `${this.address}testOrder`;
    this.http
      .post<any>(localAddress, testPacket, httpOptions)
      .subscribe((data) => {
        // console.log(data);
        this.postTestOrdr.next(data);
      });
  }
  PauseStore(rid:any) {
    const cpPausePacket = JSON.stringify({ restId: rid });
    // // console.log(cpPausePacket);
    const localAddress = `${this.address}pauseOrders`;
    this.http.post<any>(localAddress, cpPausePacket, httpOptions).subscribe(
      (data) => {
        this.pauseData.next(data);
      },
      (error) => {
       
      }
    );
  }
  cpUpdateManageDetail(rid:any, dbkey:any, dbVal:any) {
    const cpUpdateManage = JSON.stringify({
      restId: rid,
      dbkey: dbkey,
      dbVal: dbVal,
    });
    const localAddress = `${this.address}cpUpdateManage`;
    this.http
      .post<any>(localAddress, cpUpdateManage, httpOptions)
      .subscribe((data) => {
        this.updateManage.next(data);
      });
  }
  
  private updateManageNew = new Subject<any>();
  updateManageDetailsNew() {
    return this.updateManageNew.asObservable();
  }
  cpUpdateManageDetailNew(rid: any, dbkey: any, dbVal: any) {
    const cpUpdateManage = JSON.stringify({
      restId: rid,
      dbkey: dbkey,
      dbVal: dbVal,
    });
    const localAddress = `${this.reportsAddress}cpUpdateManage`;
    this.http
      .post<any>(localAddress, cpUpdateManage, httpOptions)
      .subscribe((data) => {
        this.updateManageNew.next(data);
      });
  }
  addNotes(emailId:any, storeId:any, info:any, noteType:any) {
    const NotesPacket = JSON.stringify({
      emailId: emailId,
      storeId: storeId,
      info: info,
      noteType: noteType,
    });
    // console.log(NotesPacket);
    const localAddress = `${this.address}addNotes`;
    this.http
      .post<any>(localAddress, NotesPacket, httpOptions)
      .subscribe((data) => {
        // console.log(data);
      });
  }
  stock(restId:any) {
    const outOfStockPacket = JSON.stringify({ restId: restId });
    const localAddress = `${this.address}outOfStock`;
    this.http
      .post<any>(localAddress, outOfStockPacket, httpOptions)
      .subscribe((data) => {
        this.postStock.next(data);
      });
  }


  //items out of stock
  private itemsStockData = new Subject<any>();
  getitemsStock() {
    return this.itemsStockData.asObservable();
  }
  itemsStock(restId: any) {
    const localAddress = this.serviceAddress+'v1/internal/restaurants/'+restId+'/items';
    this.http
      .get<any>(localAddress, httpOptions)
      .subscribe((data) => {
        this.itemsStockData.next(data);
      });
  }

   //modifiers out of stock
   private modifiersStockData = new Subject<any>();
   getmodifiersStock() {
     return this.modifiersStockData.asObservable();
   }
   modifiersStock(restId: any) {
     const localAddress = this.serviceAddress+'v1/internal/restaurants/'+restId+'/modifiers';
     this.http
       .get<any>(localAddress, httpOptions)
       .subscribe((data) => {
         this.modifiersStockData.next(data);
       });
   }

  cpFetchManageDetail(code:any) {
    const cpManageDetail = JSON.stringify({ code: code });
    const localAddress = `${this.address}cpFetchManage`;
    this.http
      .post<any>(localAddress, cpManageDetail, httpOptions)
      .subscribe((data) => {
        this.manageDetails.next(data);
      });
  }

  private manageStoreServicesData = new Subject<any>();
  getmanageStoreServices() {
    return this.manageStoreServicesData.asObservable();
  }
  manageStoreServices(restId: any) {
    const manageStorePacket = JSON.stringify({
      restId: restId,
    });

    const localAddress = this.address1 + "store_status";

    this.http
      .post<any>(localAddress, manageStorePacket, httpOptions)
      .subscribe((data: any) => {
        this.manageStoreServicesData.next(data);
      });
  }

  private manageStoreServicesNewData = new Subject<any>();
  getmanageStoreServicesNew() {
    return this.manageStoreServicesNewData.asObservable();
  }
  manageStoreServicesNew(restId: any) {
    const localAddress =
      this.serviceAddress +
      "v1/internal/restaurants/stores/" +
      restId +
      "/status";

    this.http.get<any>(localAddress, httpOptions).subscribe((data: any) => {
      this.manageStoreServicesNewData.next(data);
    });
  }

  private addNotesNewUpdatedData = new Subject<any>();
  getaddNotesNewUpdated() {
    return this.addNotesNewUpdatedData.asObservable();
  }
  addNotesNewUpdated(payload: any) {
    const NotesPacket = JSON.stringify(payload);
    const localAddress = `${this.serviceAddress}v1/internal/notes`;
    this.http
      .post<any>(localAddress, NotesPacket, httpOptions)
      .subscribe((data) => {
        this.addNotesNewUpdatedData.next(data);
      });
  }

  private textTalkPauseUnpauseData = new Subject<any>();
  gettextTalkPauseUnpause() {
    return this.textTalkPauseUnpauseData.asObservable();
  }
  textTalkPauseUnpause(restId: any, serviceType: any) {
    const localAddress =
      this.serviceAddress +
      "v1/internal/restaurants/stores/" +
      restId +
      "/status?service_type=" +
      serviceType;
    this.http.post<any>(localAddress, httpOptions).subscribe((data) => {
      this.textTalkPauseUnpauseData.next(data);
    });
  }

  private informManagersNewData = new Subject<any>();
  getinformManagersNew() {
    return this.informManagersNewData.asObservable();
  }
  informManagersNew(restId: any, serviceName: any, serviceText: string) {
    let data = {
      rest_id: restId,
      service_type: serviceName,
      service_text: serviceText,
    };
    const localAddress = `${this.serviceAddress}v1/internal/restaurants/stores/inform_managers`;
    this.http.post<any>(localAddress, data, httpOptions).subscribe((data) => {
      this.informManagersNewData.next(data);
    });
  }

  private newDashboardDetailUpdateData = new Subject<any>();
  getnewDahboardDetailUpdateJson() {
    return this.newDashboardDetailUpdateData.asObservable();
  }
  newDashboardDetailUpdateJson(storecode: any, payload: any) {
    const localAddress =
      this.serviceAddress + 'v1/internal/restaurants/stores/' + storecode;

    this.http.put<any>(localAddress, payload, httpOptions).subscribe((data) => {
      this.newDashboardDetailUpdateData.next(data);
    });
  }

  close: boolean = false;
  private pauseUnpauseNewData = new Subject<any>();
  getpauseUnpauseNewData() {
    return this.pauseUnpauseNewData.asObservable();
  }
  pauseUnpauseNew(payload: any) {
    var pack = JSON.stringify(payload);
    const localAddress = this.address + "storeStatusManage";
    this.http.post<string>(localAddress, pack, httpOptions).subscribe(
      (data: string) => {
        this.pauseUnpauseNewData.next(data);
      },
      (error) => {
        if (error.status == 200) {
          this.pauseUnpauseNewData.next(error.error.text);
        }
      }
    );
  }

  private informManagersData = new Subject<any>();
  getinformManagers() {
    return this.informManagersData.asObservable();
  }
  informManagers(restId: any, serviceName: any) {
    let data = {
      restId: restId,
      serviceType: serviceName,
    };
    const localAddress = `${this.address}informManagers`;
    this.http.post<any>(localAddress, data, httpOptions).subscribe((data) => {
      this.informManagersData.next(data);
    });
  }
  pauseUnpausePopupData: any;
  private addNotesNewData = new Subject<any>();
  getaddNotesNew() {
    return this.pauseUnpauseNewData.asObservable();
  }
  addNotesNew(payload: any) {
    const NotesPacket = JSON.stringify(payload);

    const localAddress = `${this.address}addNotes`;
    this.http
      .post<any>(localAddress, NotesPacket, httpOptions)
      .subscribe((data) => {
        this.addNotesNewData.next(data);
      });
  }
}
