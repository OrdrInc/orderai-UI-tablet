import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketIdPopupComponent } from './ticket-id-popup.component';

describe('TicketIdPopupComponent', () => {
  let component: TicketIdPopupComponent;
  let fixture: ComponentFixture<TicketIdPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketIdPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketIdPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
