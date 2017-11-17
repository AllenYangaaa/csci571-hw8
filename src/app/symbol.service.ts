import { Injectable } from '@angular/core';
import { Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class SymbolService {

  symbol = '';
  private symbolChange = new Subject<string>();

  symbolChange$ = this.symbolChange.asObservable();

  setSymbol(symbol: string) {
    this.symbol = symbol;
    this.symbolChange.next(this.symbol);
  }

  constructor(
    private http: HttpClient
  ) { }

  getNews(name: string): Observable<any> {
    return this.http.get<Object>('/api?name=' + name + '&type=news');
  }

  getStock(name: string): Observable<any> {
    return this.http.get<Object>('/api?name=' + name + '&type=stock');
  }

}
