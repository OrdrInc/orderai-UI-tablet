import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewService } from '../../../new.service';
import { Component, OnInit, Inject } from '@angular/core';
import { AppService } from './../../../app.service'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { FormControl } from "@angular/forms";
declare var $: any;
@Component({
  selector: 'app-store-manage-dialog',
  templateUrl: './store-manage-dialog.component.html',
  styleUrls: ['./store-manage-dialog.component.css']
})
export class StoreManageDialogComponent implements OnInit {

  constructor(public api: NewService,public cp:AppService,private router: Router, public dialogRef: MatDialogRef<StoreManageDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  smsSwitch=true;
  order:any
  to:any ;
  finalLoading=false;
  changeDollarValue=false;
  msg:any;
  notes:any;
  isNotes = true;
  updatedItems=[];
  dbValItemArr:any = [];
  dbValModArr:any = [];
  storeEditData:any;
  isEdit=false;
  location:any
  showBtn = -1;
  infoBtn= -1;
  showBtnZone = -1;
  showBtnCol1 = -1;
  showBtnCol3 = -1;
  sid="mid26";
  testData:any
  isPosBtn = true;
  loadingText='';
  isIpCheck=false;
  reasonrefund: any = "Managers decision";
  tip = false;
  delivery = false;
  fooditems = false;
  tipValue = "";
  deliveryValue = "";
  upcharge=false;
  users = new FormControl();
  fooditemsValue = "";
  chargeCustomer = [
    {
      name: "Tip",
      value: "tip",
    },
    {
      name: "Delivery",
      value: "delivery",
    }
   ]
  isStorePaused=false;
  isDeliveryPaused=false;
  testBtn = [
    {
      'item' : 'Is Text Ordering On',
      'bg' : 'white',
      'color' : 'black'
    },
    {
      'item' : 'Is Delivery On',
      'bg' : '#28a844',
      'color' : 'white'
    },
    {
      'item' : 'Is Store Connection-1 working?',
      'bg' : '#027afe',
      'color' : 'white'
    },
    {
      'item' : 'Is Store Connection-2 working?',
      'bg' : '#13a3b8',
      'color' : 'white'
    },
    ]
    PosOrders = [
      {
        'title' : 'Pickup',
        'textmsg' : '3 pepsi for pickup'
      },
      {
        'title' : 'Delivery',
        'textmsg' : '20 ranch cups and 10 pepsi'
      },
      {
        'title' : 'F/O Pickup',
        'textmsg' : '3 pepsi for pickup at 4:00 PM'
      },
      {
        'title' : 'F/O Delivery',
        'textmsg' : '20 ranch cups and 10 pepsi at 4:00 PM'
      },
      {
        'title' : 'Contactless',
        'textmsg' : '20 ranch cups and 10 pepsi. Pls do contactless and place the pizza on table'
      },
      {
        'title' : 'Custom',
        'textmsg' : '5 pepsi for pickup'
      }
    ];
    displayedColumnstxtOrdr = [
      { name: "#", value: 0, sort: false },
      { name: "POS ID", value: 1, sort: false },
      { name: "Date", value: 2, sort: false },
      { name: "Time", value: 3, sort: false },
      { name: "Method", value: 4, sort: false },
      { name: "Payment Method", value: 5, sort: false },
      { name: "Grand Total", value: 6, sort: false },
      { name: "Price Adjustment", value: 9, sort: false }, 
      { name: "Type", value: 7, sort: false },
      { name: "Order Id", value: 8, sort: false },

    ];
    fromDate:any;
    toDate:any;  
    errorTextFlag=false;
    errorText='';
    loading=false;
    displayData:any=[];
    
    initateRefund: boolean = true;
    fullRefund: boolean = false;
    partialRefund: boolean = false;
    itemRefund: boolean = false;
    refundComfirmation: boolean = false;
    refundSummary:boolean=false;
    reason: string = "";
    partialRefundAmount: string = "";
    partialRefundReason: string = "";
    customTime: any;
    itemRefundReason: any;
    type: any;
    amount: any;
    storePIN: any = "";
    item: any;
    singleItemRefund: boolean = false;
    storePinlengthMessage: boolean = false;
    pinAttempt: number = 0;
    storePinDisplay: boolean = false;
    orderDetail:any;
    chargereason:any;
    chargecustomerSuccess=false;
    chargecustomesuccesMsg='';
    chargeCustomerFailure=false;
    chargeCustomeFailureMsg='';
    maxDate:any;
    minDate:any;
    tips='';
  ngOnInit() {
    this.maxDate= new Date();
    let yesterday= new Date()
   this.minDate= yesterday.setDate(yesterday.getDate() - 7)
   this.minDate= new Date(this.minDate);
    this.errorTextFlag=false;
    this.errorText='';
    if(this.data.isViewNote){
      if(this.data.notes.length >= 1) {
        this.isNotes = false;
      }
    }
    for (const textItem of this.data.data.textArr) {
      if (textItem.item === 'Primary IP') {
        if (textItem.response !== '*') {
          this.testBtn[2].item = textItem.response;
        } else  {
          this.testBtn[2].item = 'Not Valid - IP';
        }
      }
      if (textItem.item === 'Secondary IP') {
        if (textItem.response !== '*') {
          this.testBtn[3].item = textItem.response;
        } else  {
          this.testBtn[3].item = 'Not Valid - IP';
        }
     }
    }
    if(this.data.refund){

      let fromDate = new Date();
      fromDate.setDate(fromDate.getDate());
      this.fromDate= fromDate;
      let endDate = new Date();
      endDate.setDate(endDate.getDate());
      this.toDate= endDate;
    }
  
  }
  amountValidation(){
    var amount = parseFloat(this.partialRefundAmount);
        var fullamount = parseFloat(this.orderDetail.total);
        if (amount > fullamount) {
            return true;
        }
        else {
            return false;
        }
     
  }
  openRefund(order:any){
    this.orderDetail=order;
    this.finalLoading=false;
    this.resetRefundVariables();
    this.initateRefund = false;
    this.fullRefund = false;
    this.partialRefund = false;
    this.itemRefund = false;
    this.refundSummary = false;
    this.changeDollarValue=true;
    this.api.cpUsingOrderId(this.orderDetail.orderId);
    this.api.getcpUsingOrderId().subscribe((result) => {
      this.tips=result.orderInfo.tip;
      $('#changedollar').modal('show');
    })
   
  }
  charge() {
    $('#refund').modal('hide');
    $('#changedollar').modal('hide');
    $('#upcharge').modal('show');
    this.chargereason=[];
    this.tip = false;
    this.delivery = false;
    this.fooditems = false;
    this.upcharge=true;
    this.users= new FormControl();
    this.initateRefund = false;
    this.changeDollarValue=false;
    this.chargecustomerSuccess=false;
    this.chargeCustomerFailure=false;
    this.tipValue='';
    this.fooditemsValue='';
    this.deliveryValue='';
    this.chargereason=undefined;
   
  }
  chargechanged($event:any) {
    this.chargereason = $event;
    this.tip = false;
    this.delivery = false;
    this.fooditems = false;
   
    for (var i = 0; i < this.chargereason.length; i++) {
      if (this.chargereason[i] == "tip") {
        this.tip = true;
      }
      if (this.chargereason[i] == "delivery") {
        this.delivery = true;
      }
      if (this.chargereason[i] == "fooditems") {
        this.fooditems = true;
      }
    }
  }
  chargeFinal() {
    this.chargeCustomerFailure=false;
    this.chargecustomerSuccess=false;
    let data:any = {
      orderId: this.orderDetail.orderId,
      source: "from Tablet",
      dollarValue: [],
      reason: this.chargereason,
      type:this.chargereason,
    };
    if(this.tipValue!=''){
      data.dollarValue.push(this.tipValue);
    }
    if(this.deliveryValue!=''){
      data.dollarValue.push(this.deliveryValue);
    }
    if(this.fooditemsValue!=''){
      data.dollarValue.push(this.fooditemsValue);
    }
   this.api.chargeCustomer(data);
   this.api.getchargeCustomer().subscribe((result) => {
    this.loading = false;
    if(result.status==200){
      this.chargeCustomerFailure=false;
      this.chargeCustomeFailureMsg=''
      this.chargecustomerSuccess=true;
      this.chargecustomesuccesMsg='Customer Charged Successfully.'
    }
    else{
      this.chargeCustomerFailure=true;
      this.chargeCustomeFailureMsg='Customer Charge Failed.'
      this.chargecustomerSuccess=false;
      this.chargecustomesuccesMsg='';
    }
  });
  }
  backtoMainMenu(){
    this.finalLoading=false;
    this.resetRefundVariables();
    this.initateRefund = false;
    this.fullRefund = false;
    this.partialRefund = false;
    this.itemRefund = false;
    this.refundSummary = false;
    this.changeDollarValue=true;
    $('#refund').modal('hide');
    $('#changedollar').modal('show');
    $('#upcharge').modal('hide');
  }
  refun(){
   
    this.finalLoading=false;
    this.resetRefundVariables();
    this.initateRefund = true;
    this.fullRefund = false;
    this.partialRefund = false;
    this.itemRefund = false;
    this.refundSummary = false;
    this.changeDollarValue=false;
    $('#refund').modal('show');
    $('#changedollar').modal('hide');
  }
  resetRefundVariables() {
    this.reason = "";
    this.partialRefundAmount = "";
    this.partialRefundReason = "";
    this.customTime = "";
    this.itemRefundReason = "";
    this.type = "";
    this.amount = "";
   
    this.storePIN = "";
    this.item = "";
    this.singleItemRefund = false;
    this.pinAttempt = 0;
    this.storePinlengthMessage = false;
    this.storePinDisplay = false;
}
storePinString(data:any){
  data=data.toString();
  return data;
 }
refundType(type:any) {
  if (type == 'FULL') {
     /* this.initateRefund = false;
      this.fullRefund = true;
      this.partialRefund = false;
      this.itemRefund = false;
      this.refundSummary = false;*/
      this.submitRefundRequest('FULL');
  }
  if (type == 'PARTIAL') {
      this.partialRefundAmount = "";
      this.partialRefundReason = "";
      this.initateRefund = false;
      this.fullRefund = false;
      this.partialRefund = true;
      this.itemRefund = false;
      this.refundSummary = false;
  }
 
}
submitRefundRequest(type:any) {
  this.refundSummary = true;
  this.initateRefund = false;
  this.fullRefund = false;
  this.partialRefund = false;
  this.itemRefund = false;
  if (type == 'FULL') {
      this.singleItemRefund = false;
      this.type = 'Full Refund'
      this.amount = parseFloat(this.orderDetail.total)+parseFloat(this.tips);
      this.amount = this.amount.toString();

  }
  if (type == 'PARTIAL') {
      this.singleItemRefund = false;
      this.type = 'Partial  Refund'
      this.amount = this.partialRefundAmount;  
    }
 
}
finalRefund(){
  var payload={
    orderId:  this.orderDetail.orderId,
    reason : this.reasonrefund, 
    refundValue : this.amount.toString(), 
    refundType: "order"
}
console.log(payload);
this.finalLoading=true;
var pin=this.cp.checkPin(this.data.id, this.storePIN).subscribe(
  data => {
    this.finalLoading=false;
  
      if (data.pinStatus == true) {
          this.pinAttempt = 0;
          pin.unsubscribe();
          this.finalLoading=true;
          /*this.api.cpRefund(payload);
          this.api.getcpRefund()
          .subscribe((x) => {
          this.finalLoading=false;
         
          if(x.message=='Success'){
            for(var i=0;i<this.displayData.length;i++){
              if(this.displayData[i].orderId==this.orderDetail.orderId){
                this.displayData[i].isRefund=true;
              }
            }
            $("#refundSuccess").modal("show");
            $("#refund").modal("hide");

          }
          else{
            $("#refundFailed").modal("show");
            $("#refund").modal("hide");
          }
          })*/
          let data:any = {
            orderId: this.orderDetail.orderId,
            refundSource: "from rest tablet",
            dollarValue: this.amount.toString(),
            reason:  this.reasonrefund,
            refundType: this.type,
            refundMsg: "",
          };
          if (this.smsSwitch) {
            data.refundMsg = "refund";
          } else {
            data.refundMsg = "nosms";
          }
          console.log(data);
          this.api.finalRefundNew(data);
      
          this.api.getfinalRefundNew().subscribe((result) => {
            this.loading = false;
            if(result.status==200){
              for(var i=0;i<this.displayData.length;i++){
                if(this.displayData[i].orderId==this.orderDetail.orderId){
                  this.displayData[i].isRefund=true;
                }
              }
              $("#refundSuccess").modal("show");
              $("#refund").modal("hide");
              
            }
            else{
             $("#refundFailed").modal("show");
             $("#refund").modal("hide");
            
            }
          });
        }
      else {
          this.pinAttempt = this.pinAttempt + 1;
          if (this.pinAttempt > 3) {

          }
      }
  },
  error => {
      this.loading = false;
      $("#refundFailed").modal("show");
      $("#refund").modal("hide");
      console.log(error);
  });
}

refundClick() {


  this.resetRefundVariables();
  this.initateRefund = true;
  this.fullRefund = false;
  this.partialRefund = false;
  this.itemRefund = false;
  this.refundSummary = false;
}
  search(){
    this.errorTextFlag=false;
    this.errorText='';
    if(this.fromDate== null || this.fromDate==''){
      this.errorTextFlag=true;
      this.loading = false;;
      this.errorText="Please select a From Date." 
    }
    else if(this.toDate== null || this.toDate==''){
      this.errorTextFlag=true;
      this.loading = false;;
      this.errorText="Please select To Date." 
    }
   else if(this.fromDate> new Date()){
      this.errorTextFlag=true;
      this.loading = false;;
      this.errorText="From Date Can't be greater than Today's Date."
    }
    else if(this.toDate> new Date()){
      this.errorTextFlag=true;
      this.loading = false;
      this.errorText="To Date Can't be greater than Today's Date."
    }
    else if(this.fromDate> this.toDate){
      this.errorTextFlag=true;
      this.loading = false;
      this.errorText="From Date Can't be greater than To Date."
    }
    else{
      var from = `${this.fromDate.getFullYear()}-${this.dateFormatter((this.fromDate.getMonth() + 1))}-${this.dateFormatter(this.fromDate.getDate())}`;
      var to= `${this.toDate.getFullYear()}-${this.dateFormatter((this.toDate.getMonth() + 1))}-${this.dateFormatter(this.toDate.getDate())}`;
      var data={
        searchBy:"txtorder",
        fromDate:from,
        toDate:to,
        restNum:this.data.id
      }
      this.loading = true;
      this.api.cpcontrolData(data);
      this.api.getcpcontrolData().subscribe((data) => {
        //console.log(data);
        this.loading = false;
        if (data.statusCode == 200) {
          this.displayData = data.data;

          if (this.displayData.length == 0) {
            this.errorTextFlag = true;
            this.errorText = "No Data Found.";
          }
          else{
            this.errorTextFlag=true;
            this.errorText = "No prepaid orders for the selected date range.";
            for(var i=0;i<this.displayData.length;i++){
              if(this.displayData[i].isPaid){
                this.errorTextFlag = false;
                this.errorText = "";
                break
              } 
            }
           
          }
          console.log(this.displayData);
        }
      });
    }
  
  }
  onEdit_col3(i:any) {
    this.isEdit = true;
    this.showBtnCol3 = i;
  }
  dateFormatter(val:any) {
    val = val.toString()
    if (val.length != 1) {
      return val
    } else {
      return `0${val}`
    }
  }
  onEdit_col1(i:any) {
    this.isEdit = true;
    this.showBtnCol1 = i;
  }
  onEdit(i:any) {
    this.location = i;
    this.isEdit = true;
    this.showBtn = i;
  }
  info(i:any){
    this.infoBtn=i;
  }
  close() {
    this.dialogRef.close();
  }

  
 cancelEdit(){
  this.isEdit = false;
  this.showBtn = -1;
  this.showBtnCol1 = -1;
  this.showBtnCol3 = -1;
  this.showBtnZone =- 1;
  this.api.cpFetchManageDetail(this.sid.toUpperCase());
  this.api.getManageDetails()
   .subscribe((storeResponse) => {
     console.log(storeResponse);
     this.data.data=storeResponse;
 });
 }
  onItemsChange() {
    for (const cat of this.data.data) {
      for (const item of cat.itemsList) {
        if (!item.availability){
          this.dbValItemArr.push(item.dbName)
        }
      }
    }
    this.api.cpUpdateManageDetailNew(this.data.id, ['itemsOOStock'], this.dbValItemArr)
    this.dialogRef.close();
  }
  updateModifiers(item:any) {
    // //console.log(item)
  }
  async updateKey(res:any) {
    const dbKeyArr  = res.db.split('.');
     if(res.response=='YES'){
       res.response= true;
     }
     if(res.response=='NO'){
       res.response =false
     }
     await this.api.cpUpdateManageDetail(this.data.id, dbKeyArr,  res.response);
     //console.log('inside Updatekey')
     //console.log(res)
     const note = `updated ${res.db}`
     this.api.addNotes("karthik92.ind@gmail.com", this.sid.toUpperCase(), note, 'log')
     // this.cancelEdit();
  
     var subscription= this.api.updateManageDetails()
       .subscribe((data) => {
         subscription.unsubscribe();
         this.cancelEdit();
       });
  }
  editItem(radio:any) {
    if (radio.db.includes('storeHours_json')) {
      if (radio.item === 'Zone') {
        this.updateKey(radio);
      } else {
          if (radio.open_0 === '*') {
            let dbKeyArr1  = radio.db.split('.');
            dbKeyArr1 = this.storeHoursUpdate('open', '*', radio.open, dbKeyArr1);
            dbKeyArr1 = this.storeHoursUpdate('close', 'open', radio.close, dbKeyArr1);
            this.api.updateManageDetails()
              .subscribe((data) => {
               // //console.log('update completed')
               // this.storeHourSubscription = this.cp.cpStoreTxtHour(this.cp.sendRestId)
                this.cancelEdit();
              });
          } else {
            let dbKeyArr1  = radio.db.split('.');
            dbKeyArr1 = this.storeHoursUpdate('open', '*', radio.open, dbKeyArr1);
            dbKeyArr1 = this.storeHoursUpdate('close', 'open', radio.close, dbKeyArr1);
            dbKeyArr1 = this.storeHoursUpdate('open_0', 'close', radio.open_0, dbKeyArr1);
            dbKeyArr1 = this.storeHoursUpdate('close_0', 'open_0', radio.close_0, dbKeyArr1);
            this.api.updateManageDetails()
              .subscribe((data) => {
               //  //console.log('update completed')
               //  this.storeHourSubscription = this.cp.cpStoreTxtHour(this.cp.sendRestId)
                this.cancelEdit();
              });
          }
    
          const note = `updated ${radio.db}`
         
          this.api.addNotes("", this.sid, note, 'log') 
    
        
  
      }
    } else if (radio.db.includes('cb_atStoreLim')){
      this.updateKey(radio)
      this.api.cpUpdateManageDetail(this.data.id, ['cb_cashEligibleLim'], radio.response)
  
    } 
    else {
      this.updateKey(radio);
    }
  }
  onEditZone(i:any) {
    this.isEdit = true;
    this.showBtnZone = i
  }
  trackByFn(index: any, item: any) {
    return index;
 }
  onModChange() {
    for (const cat of this.data.data) {
      for (const item of cat.items) {
        if (!item.availability){
          this.dbValModArr.push(item.dbName)
        }
      }
    }
    this.api.cpUpdateManageDetailNew(this.data.id, ['modsOOStock'], this.dbValModArr)
    this.dialogRef.close();
  } 
  storeHoursUpdate(pushKey:any, popKey:any, hoursInfo:any, dbArr:any) {
    if (popKey !== '*') {
      dbArr.pop(popKey);
    }
    dbArr.push(pushKey);
    this.api.cpUpdateManageDetail(this.data.id, dbArr,  hoursInfo);
  
    return dbArr;
  }

  onTestCase(item:any) {
    this.isPosBtn=true;
    this.loadingText= item;
    this.isIpCheck=false;
    this.isStorePaused=false;
    this.isDeliveryPaused=false;
    this.testData=[];
    if (item  === 'Store Paused') {
      
      const testCase = '5 pespi for pickup';
      this.api.testOrder(this.data.id, testCase, 'Store Paused');
      this.api.getTestorder()
      .subscribe((x) => {
        this.loadingText= '';
        this.isStorePaused=true;
        if (x.summaryJson.customer.msg.type !== 'order') {
          this.testData = {'res' : x.summaryJson.orderSummary, 'item' : item};
         
        } else {
          // tslint:disable-next-line:max-line-length
          this.testData = {'res' : 'Currently store is taking orders. If this is not the expected behaviour for this store. Please reachout to system administrator.', 'item' : item};
       
        }
      });
    }
    if (item  === 'Delivery Paused') {
     
      const testCase = `20 ranch cups delivery at`;
      this.api.testOrder(this.data.id, testCase, 'Delivery Paused');
      this.api.getTestorder()
      .subscribe((x) => {
        this.loadingText= '';
        this.isDeliveryPaused=true;
        if (x.summaryJson.customer.msg.type !== 'order') {
          this.testData = {'res' : x.summaryJson.orderSummary, 'item' : item};
  
        } else {
         
          this.testData = {'res' : 'Currently store is taking delivery orders. If this is not the expected behaviour for this store. Please reachout to the system administrator.', 'item' : item};
         
        }
      });
    }
    if (item.includes('.')) {
      
      this.api.checkIPV1(item);
      this.api.getIP()
      .subscribe((x) => {
        this.isIpCheck=true;
        this.loadingText= '';
        this.testData = {'res' : x, 'ip' : item};
     
      });
      }
  
   
  }
  add(item:any,index:any) {
    //console.log(item);
    this.data.data.storeHours[index].open_0 = '00:00:00';
    this.data.data.storeHours[index].close_0 = '00:00:00';
    this.onEdit_col1(index);
    this.api.cpAddStoreHours(this.data.id, item.db.split('.'), '*');
  
  }
  
  remove(item:any, index:any) {
    //console.log(item);
    //console.log(item);
    this.data.data.storeHours[index].open_0 = '*';
    this.data.data.storeHours[index].close_0 = '*';
    this.onEdit_col1(index);
    this.api.cpRemoveStoreHours(this.data.id, item.db.split('.')[1]);
  }
  cancelEdit1(day:any, i:any){
    this.remove(day, i);
    this.cancelEdit();
  }
}
