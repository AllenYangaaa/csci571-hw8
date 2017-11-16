import { Injectable } from '@angular/core';
import { Subject} from "rxjs/Subject";

@Injectable()
export class SymbolService {

  symbol = '';
  private symbolChange = new Subject<string>();

  symbolChange$ = this.symbolChange.asObservable();

  setSymbol(symbol: string) {
    this.symbol = symbol;
    this.symbolChange.next(this.symbol);
  }

  constructor() { }

}
