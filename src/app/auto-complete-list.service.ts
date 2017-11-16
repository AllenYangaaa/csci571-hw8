import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import { HttpClient, HttpHeaders } from "@angular/common/http";

// import { SymbolList } from "./symbolList";

@Injectable()
export class AutoCompleteListService {

  private demoList: string[] = [
    'GOOG',
    'TSLA',
    'APPL'
  ];

  private apiUrl = '/api?input=';

  constructor(
    private http: HttpClient
  ) { }

  // getSymbolList(name: string): Observable<string[]> {
  //   const cloneArray: string[] = this.demoList.concat([]);
  //   if (name) {
  //     cloneArray.push(name);
  //   }
  //   return of(cloneArray);
  // }


  getSymbolList(name: string): Observable<any> {
    return this.http.get<Object[]>('/api?name=' + name);
  }

}
