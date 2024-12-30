import { NewService } from "./../../../new.service";
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-pause-reason-popup',
  templateUrl: './pause-reason-popup.component.html',
  styleUrls: ['./pause-reason-popup.component.css'],
})
export class PauseReasonPopupComponent implements OnInit {
  constructor(
    private api: NewService,
    public dialogRef: MatDialogRef<PauseReasonPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  notes = '';
  storePauseManagerNotify: boolean = true;
  ngOnInit() {}
  addNotes(type: any) {
    let payloadNew;
    if (type === 'skip') {
      payloadNew = {
        notes: 'No Notes Added',
        notifyFlag: this.storePauseManagerNotify,
      };
    } else {
      payloadNew = {
        notes: this.notes,
        notifyFlag: this.storePauseManagerNotify,
      };
    }
    this.api.pauseUnpausePopupData = payloadNew;
    this.dialogRef.close();
  }
  close() {
    this.api.pauseUnpausePopupData = {
      notes: '',
      notifyFlag: '',
    };
    this.api.close = true;
    this.dialogRef.close();
  }
}
