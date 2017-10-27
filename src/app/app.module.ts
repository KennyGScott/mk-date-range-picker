import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MkDateRangePickerModule } from './mk-date-range-picker/mk-date-range-picker.module'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
		MkDateRangePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
