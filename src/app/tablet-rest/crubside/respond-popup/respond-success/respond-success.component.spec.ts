import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RespondSuccessComponent } from './respond-success.component';

describe('RespondSuccessComponent', () => {
  let component: RespondSuccessComponent;
  let fixture: ComponentFixture<RespondSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespondSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RespondSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
