import { Component, OnInit,Input ,Inject} from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewService } from '../../../new.service';

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.css']
})
export class FeedbackDetailComponent implements OnInit {

  constructor(public api: NewService, public dialogRef: MatDialogRef<FeedbackDetailComponent>
    ,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
   console.log(this.data.storeName);
  }
  close() {
    this.dialogRef.close();
  }
  formatPhone(x:any) {
    // console.log('format phone')
    const val = x.split("");
    // console.log(val)
    const displayNo = `(${val[2]}${val[3]}${val[4]}) ${val[5]}${val[6]}${val[7]}-${val[8]}${val[9]}${val[10]}${val[11]}`;
    return displayNo;
  }

}
