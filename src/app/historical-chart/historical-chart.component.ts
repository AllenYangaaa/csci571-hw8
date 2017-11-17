import {Component, OnInit, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import {SymbolService} from '../symbol.service';
import {DATA} from '../mock-stock';
import {JSONDATA} from "../mock-stock-json";

@Component({
  selector: 'app-historical-chart',
  templateUrl: './historical-chart.component.html',
  styleUrls: ['./historical-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HistoricalChartComponent implements OnInit {

  symbol = '';

  options: Object;

  data = DATA;

  dataReady = false;

  constructor(public symbolService: SymbolService,
              private ref: ChangeDetectorRef) {
    symbolService.symbolChange$.subscribe(
      symbol => {
        this.changeSymbol(symbol);
      }
    );
  }

  setOption() {
    this.options = {

      chart: {
        height: null,
        width: null
      },

      rangeSelector: {
        buttons: [{
          type: 'week',
          count: 1,
          text: '1w'
        }, {
          type: 'month',
          count: 1,
          text: '1m'
        }, {
          type: 'month',
          count: 3,
          text: '3m'
        }, {
          type: 'month',
          count: 6,
          text: '6m'
        }, {
          type: 'ytd',
          text: 'YTD'
        }, {
          type: 'year',
          count: 1,
          text: '1y'
        }, {
          type: 'all',
          text: 'All'
        }],
        selected: 0
      },

      title: {
        text: this.symbol + ' Stock Value'
      },
      yAxis: {
        title: {
          text: 'Stock Value'
        }
      },
      subtitle: {
        text: '<a href="https://www.alphavantage.co/">Source: Alpha Vantage</a>'
      },
      tooltip: {
        shared: true,
        split: false
      },

      series: [{
        name: this.symbol,
        data: this.data,
        type: 'area',
        threshold: null,
        tooltip: {
          valueDecimals: 2,
          shared: true,
          split: false
        }
      }],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            chart: {
              height: 300
            },
            subtitle: {
              text: null
            },
            navigator: {
              enabled: false
            }
          }
        }]
      }
    };
  }

  parseStock(results: Object) {
    console.log('Received stock data!');
    this.data = [];
    const data = results['Time Series (Daily)'];
    var count = 0;
    // console.log(data);
    for (const key of Object.keys(data)) {
      const date = new Date(key);
      // console.log(date);
      // console.log(date.valueOf());
      const price = parseFloat(data[key]['4. close']);
      // console.log(price);
      this.data.push([date.valueOf(), price]);
      count = count + 1;
      if (count === 1000) {
        break;
      }
    }
    this.data = this.data.reverse();
    console.log(this.data);
    this.setOption();
    this.dataReady = true;
    this.ref.markForCheck();
  }

  ngOnInit() {
    this.symbol = this.symbolService.symbol;
    // this.setOption();
    this.symbolService.getStock(this.symbol).subscribe(
      // symbolList => this.options = symbolList
      // res => this.debugInfo = res[0]['Name']
      res => this.parseStock(res)
    );
  }

  changeSymbol(symbol: string) {
    console.log('Stock change symbol.' + symbol);
    this.symbol = symbol;
    this.dataReady = false;
    // this.setOption();
    console.log(this.options['series'][0]['name']);
    // this.parseStock(JSONDATA);
    this.ref.markForCheck();
    this.symbolService.getStock(this.symbol).subscribe(
      // symbolList => this.options = symbolList
      // res => this.debugInfo = res[0]['Name']
      res => this.parseStock(res)
    );
  }

}
