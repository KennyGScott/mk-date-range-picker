import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MkDateRangePickerComponent } from './mk-date-range-picker.component';

describe('MkDateRangePickerComponent', () => {
  let component: MkDateRangePickerComponent;
  let fixture: ComponentFixture<MkDateRangePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MkDateRangePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MkDateRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
