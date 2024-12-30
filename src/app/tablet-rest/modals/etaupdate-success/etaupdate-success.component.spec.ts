import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtaupdateSuccessComponent } from './etaupdate-success.component';

describe('EtaupdateSuccessComponent', () => {
  let component: EtaupdateSuccessComponent;
  let fixture: ComponentFixture<EtaupdateSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtaupdateSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtaupdateSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
