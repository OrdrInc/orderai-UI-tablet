import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePinComponent } from './store-pin.component';

describe('StorePinComponent', () => {
  let component: StorePinComponent;
  let fixture: ComponentFixture<StorePinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorePinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
