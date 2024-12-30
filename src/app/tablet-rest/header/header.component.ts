import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() resturantName!: string;
  @Output('resetRefundVariables') refundVariables: EventEmitter<any> = new EventEmitter();
  constructor() {

  }

  ngOnInit() {
  }
  resetRefundVariables() {
    this.refundVariables.emit();

  }
}
