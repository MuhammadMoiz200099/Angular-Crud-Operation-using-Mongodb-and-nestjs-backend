import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialDesignModule } from './external-modules/custom-material-design.module';
import { CarTableComponent } from './components/car-table/car-table.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './pipes/filter.pipe';
import { AddCarRecordsComponent } from './entry-components/add-car-records/add-car-records.component';

@NgModule({
  declarations: [
    AppComponent,
    CarTableComponent,
    SearchFilterComponent,
    FilterPipe,
    AddCarRecordsComponent
  ],
  entryComponents: [
    AddCarRecordsComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CustomMaterialDesignModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
