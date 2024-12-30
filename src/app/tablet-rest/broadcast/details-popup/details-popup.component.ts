import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewService } from '../../../new.service';
import { Component, OnInit, Inject } from '@angular/core';
import { AppService } from './../../../app.service'
import { Router } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
@Component({
  selector: 'app-details-popup',
  templateUrl: './details-popup.component.html',
  styleUrls: ['./details-popup.component.css']
})
export class DetailsPopupComponent implements OnInit {

  constructor(public api: NewService,public dialog:MatDialog ,public cp:AppService,private router: Router, public dialogRef: MatDialogRef<DetailsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
  }
  close(){
    this.dialog.closeAll();
    this.dialogRef.close();
  }

}
