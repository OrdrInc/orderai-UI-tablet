import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreManageDialogComponent } from './store-manage-dialog.component';

describe('StoreManageDialogComponent', () => {
  let component: StoreManageDialogComponent;
  let fixture: ComponentFixture<StoreManageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreManageDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreManageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
