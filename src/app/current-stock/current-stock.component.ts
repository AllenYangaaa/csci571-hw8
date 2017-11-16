import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {SymbolService} from "../symbol.service";

@Component({
  selector: 'app-current-stock',
  templateUrl: './current-stock.component.html',
  styleUrls: ['./current-stock.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CurrentStockComponent implements OnInit {

  constructor(
    public symbolService: SymbolService
  ) { }

  ngOnInit() {
  }

}
