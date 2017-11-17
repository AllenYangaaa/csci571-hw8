import {Component, OnInit, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import {SymbolService} from '../symbol.service';

@Component({
  selector: 'app-news-feed-section',
  templateUrl: './news-feed-section.component.html',
  styleUrls: ['./news-feed-section.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class NewsFeedSectionComponent implements OnInit {

  symbol = '';

  news = [
    // {
    //   title: 'test',
    //   link: 'test',
    //   author: 'test',
    //   date: 'test'
    // }
  ];
  hasNews = false;

  constructor(public symbolService: SymbolService,
              private ref: ChangeDetectorRef) {
    symbolService.symbolChange$.subscribe(
      symbol => {
        this.changeSymbol(symbol);
      }
    );
  }

  parseNews(results: Object) {
    const numbers = [0, 1, 2, 3, 4];
    this.news = [];
    for (const i of numbers) {
      const item = results['rss']['channel']['item'][i];
      this.news.push(
        {
          title: item['title'],
          link: item['link'],
          author: item['sa:author_name'],
          date: item['pubDate']
        }
      );
    }
    this.hasNews = true;
    this.ref.markForCheck();
  }

  ngOnInit() {
    this.symbol = this.symbolService.symbol;
    this.symbolService.getNews(this.symbol).subscribe(
      // symbolList => this.options = symbolList
      // res => this.debugInfo = res[0]['Name']
      res => this.parseNews(res)
    );
  }

  changeSymbol(symbol: string) {
    console.log('News change symbol.' + symbol);
    this.symbol = symbol;
    this.ref.markForCheck();
    this.symbolService.getNews(this.symbol).subscribe(
      // symbolList => this.options = symbolList
      // res => this.debugInfo = res[0]['Name']
      res => this.parseNews(res)
    );
  }

}
