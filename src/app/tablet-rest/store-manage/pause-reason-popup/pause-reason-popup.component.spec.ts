import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PauseReasonPopupComponent } from './pause-reason-popup.component';

describe('PauseReasonPopupComponent', () => {
  let component: PauseReasonPopupComponent;
  let fixture: ComponentFixture<PauseReasonPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PauseReasonPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PauseReasonPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
