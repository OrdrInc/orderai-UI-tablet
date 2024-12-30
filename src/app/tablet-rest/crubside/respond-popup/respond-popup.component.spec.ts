import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondPopupComponent } from './respond-popup.component';

describe('RespondPopupComponent', () => {
  let component: RespondPopupComponent;
  let fixture: ComponentFixture<RespondPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
