import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendEtaComponent } from './extend-eta.component';

describe('ExtendEtaComponent', () => {
  let component: ExtendEtaComponent;
  let fixture: ComponentFixture<ExtendEtaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtendEtaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendEtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
