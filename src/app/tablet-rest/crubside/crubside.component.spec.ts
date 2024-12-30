import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrubsideComponent } from './crubside.component';

describe('CrubsideComponent', () => {
  let component: CrubsideComponent;
  let fixture: ComponentFixture<CrubsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrubsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrubsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
