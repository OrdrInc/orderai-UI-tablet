import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-store-report',
  templateUrl: './store-report.component.html',
  styleUrls: ['./store-report.component.css']
})
export class StoreReportComponent implements OnInit {
  @Input() storemetrics:any;
  @Input() smallload:any;
  constructor() { }

  ngOnInit() {
  }

}
