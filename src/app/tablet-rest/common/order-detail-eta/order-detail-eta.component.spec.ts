import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailEtaComponent } from './order-detail-eta.component';

describe('OrderDetailEtaComponent', () => {
  let component: OrderDetailEtaComponent;
  let fixture: ComponentFixture<OrderDetailEtaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailEtaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailEtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
