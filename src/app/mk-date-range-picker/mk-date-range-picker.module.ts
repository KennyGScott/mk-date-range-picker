import { NgModule } from '@angular/core';
import { FormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MkDateRangePickerComponent } from './mk-date-range-picker/mk-date-range-picker.component';

@NgModule({
  imports: [
    CommonModule,
		FormsModule
  ],
  declarations: [MkDateRangePickerComponent],
  exports: [MkDateRangePickerComponent]

})
export class MkDateRangePickerModule { }
