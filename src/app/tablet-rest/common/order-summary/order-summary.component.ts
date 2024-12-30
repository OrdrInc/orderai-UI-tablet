import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  @Input() items: any;
  @Input() qty: any;
  @Input() sizes: any;
  @Input() cursts: any;
  @Input() itemNames: any;

  @Input() amounts: any;
  @Input() sauce: any;
  @Input() toppings: any;
  @Input() firstHalf: any;
  @Input() secondHalf: any

  @Input() seasoning: any;
  @Input() bread: any;
  @Input() drizzle: any;
  @Input() cheese: any;
  @Input() crustTopper: any;

  @Input() wingType: any;
  @Input() sides: any;
  @Input() bake: any;
  @Input() cut: any;
  @Input() dipping: any;

  @Input() sauceBase: any;
  @Input() seasoningPackets: any;
  @Input() dressing: any;
  @Input() orderDetail: any;

  constructor() { }

  ngOnInit() {
  }

}
