import { Component, OnInit,Input ,Inject} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewService } from '../../../new.service';
import {FeedbackDetailComponent} from './../feedback-detail/feedback-detail.component'
@Component({
  selector: 'feedback-history',
  templateUrl: './feedback-history.component.html',
  styleUrls: ['./feedback-history.component.css']
})
export class FeedbackHistoryComponent implements OnInit {

  constructor(public api: NewService, public dialogRef: MatDialogRef<FeedbackHistoryComponent>
    ,@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog) { }

    loading=false;
    fromDate:any;
    toDate:any;
    history:any=[];
    from:any;
    to:any;
    errorTextFlag=false;
    errorText='';
    hidePagination = false;
  endIndex = "0";
  totalCount = "0";
  limit = "100";
  skip = "0";
  length = "100";
  showTable = false;
  startIndex:any="0";
    reportHead = [
      { name: "Store Date", id: 0, sort: "no" },
      { name: "Store Phone", id: 1, sort: "no" },
      { name: "In Time", id: 2, sort: "no" },
      { name: "Out Time", id: 3, sort: "no" },
      { name: "Customer Phone", id: 4, sort: "no" },
      { name: "Customer Name", id: 5, sort: "no" },
      { name: "Feedback", id: 6, sort: "no" },
      { name: "Type", id: 7, sort: "no" },
      { name: "Rating", id: 8, sort: "no" },
    ];
  ngOnInit() {
    let fromDate = new Date();
    fromDate.setDate(fromDate.getDate()-180);
    this.fromDate= fromDate;
    let endDate = new Date();
    endDate.setDate(endDate.getDate());
    this.toDate= endDate;
    this.search()
  }
 
  search() {
    
    this.history = [];
    this.errorTextFlag=false;
    this.errorText='';
    this.showTable=false;
      if (this.fromDate == null || this.fromDate == "") {
      this.errorTextFlag = true;
      this.loading = false;
      this.errorText = "Please select a From Date.";
    } else if (this.toDate == null || this.toDate == "") {
      this.errorTextFlag = true;
      this.loading = false;
      this.errorText = "Please select To Date.";
    } else if (this.fromDate > new Date()) {
      this.errorTextFlag = true;
      this.loading = false;
      this.errorText = "From Date Can't be greater than Today's Date.";
    } else if (this.toDate > new Date()) {
      this.errorTextFlag = true;
      this.loading = false;
      this.errorText = "To Date Can't be greater than Today's Date.";
    } else if (this.fromDate > this.toDate) {
      this.errorTextFlag = true;
      this.loading = false;
      this.errorText = "From Date Can't be greater than To Date.";
    } else {
      this.from = `${this.fromDate.getFullYear()}-${this.dateFormatter(
        this.fromDate.getMonth() + 1
      )}-${this.dateFormatter(this.fromDate.getDate())}`;
      this.to = `${this.toDate.getFullYear()}-${this.dateFormatter(
        this.toDate.getMonth() + 1
      )}-${this.dateFormatter(this.toDate.getDate())}`;

      var data = {
        fromDate: this.from,
        toDate: this.to,
        restId: [this.data.restId],
        limit: this.limit,
        skip: this.skip,
        category:'sms'
      };
     
     
      this.loading = true;
      this.showTable = false;
      this.api.feedbackHistory(data);
      this.api.getfeedbackHistory().subscribe((x) => {
        this.loading = false;
        if (x.statusCode != 200 && x.message != "sucess") {
          this.errorTextFlag = true;
          this.errorText = "Oops something went wrong please try again later. ";
        } else if (x.data.records.length == 0) {
          this.errorTextFlag = true;
          this.errorText = "No records Found";
        } else if (x.data.records.length > 0) {
          this.errorTextFlag = false;
          /* for(var i=0;i<100;i++){
        x.data.records.push(x.data.records[0]);
        x.data.totalRecords=x.data.totalRecords+1;
      }*/
          this.startIndex = (parseInt(this.skip) + 1).toString();
          if (
            x.data.totalRecords >=
            parseInt(this.limit) + parseInt(this.skip)
          ) {
            this.endIndex = (
              parseInt(this.limit) + parseInt(this.skip)
            ).toString();
          } else {
            this.endIndex = x.data.totalRecords;
          }
          this.history = x.data.records;
          for(let i=0;i<this.history.length;i++){
            if(this.history[i].isDefaultFeedback==undefined){
              this.history[i]["isDefaultFeedback"]=true;
            }
          }
          console.log(this.history);
          this.totalCount = x.data.totalRecords;
          this.showTable = true;
        }
      });
    }
  }
  openFeedbackDetail(data:any){
   
    data["storeName"]=this.data.restName
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
  dateFormatter(val:any) {
    val = val.toString();
    if (val.length != 1) {
      return val;
    } else {
      return `0${val}`;
    }
  }
  next() {
    this.skip = (parseInt(this.skip) + parseInt(this.limit)).toString();
    this.search();
  }
  previous() {
    this.skip = (parseInt(this.skip) - parseInt(this.limit)).toString();
    this.search();
  }
  itemsperpage(length:any) {
    // console.log(length);
    this.limit = length;
    this.skip = "0";
    this.search();
  }
  start() {
    this.skip = "0";
    this.search();
  }
  end() {
    if(parseInt(this.totalCount) % parseInt(this.limit)==0){
      this.skip = (
        parseInt(this.totalCount) -
        ( parseInt(this.limit))
      ).toString();
    }
    else{
    this.skip = (
      parseInt(this.totalCount) -
      (parseInt(this.totalCount) % parseInt(this.limit))
    ).toString();
    }
    this.search();
  }
  close() {
    this.dialogRef.close();
  }


}
