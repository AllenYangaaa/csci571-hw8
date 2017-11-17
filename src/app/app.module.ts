import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from "@angular/forms";
import { ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';


import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { FavorListComponent } from './favor-list/favor-list.component';
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { CurrentStockComponent } from './current-stock/current-stock.component';
import { HistoricalChartComponent } from './historical-chart/historical-chart.component';
import { NewsFeedSectionComponent } from './news-feed-section/news-feed-section.component';

import { AutoCompleteListService} from "./auto-complete-list.service";
import { SymbolService } from './symbol.service';
import { SlidePanelComponent } from './slide-panel/slide-panel.component';

declare var require: any;
export function highchartsFactory() {
//return require('highcharts');
  const hc = require('highcharts');
  const dd = require('highcharts/modules/drilldown');
  const ex = require('highcharts/modules/exporting');
  const st = require('highcharts/modules/stock');

  dd(hc);
  ex(hc);
  st(hc);
  return hc;
}

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    FavorListComponent,
    StockDetailComponent,
    CurrentStockComponent,
    HistoricalChartComponent,
    NewsFeedSectionComponent,
    SlidePanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ChartModule
  ],
  providers: [
    AutoCompleteListService,
    SymbolService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
