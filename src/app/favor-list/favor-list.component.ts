import { Component, OnInit, ViewEncapsulation, EventEmitter, Input, Output, NgZone, ChangeDetectorRef} from '@angular/core';
import { SymbolService} from '../symbol.service';

@Component({
  selector: 'app-favor-list',
  templateUrl: './favor-list.component.html',
  styleUrls: ['./favor-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FavorListComponent implements OnInit {


  @Output() toSlide: EventEmitter<PaneType> = new EventEmitter();

  symbol = '';

  constructor(
    public symbolService: SymbolService,
    private ref: ChangeDetectorRef
  ) {
    symbolService.symbolChange$.subscribe(
      symbol => {
        this.changeSymbol(symbol);
      }
    );
  }

  ngOnInit() {
  }

  slidePanel() {
    console.log('emit');
    this.toSlide.emit('right');
  }

  changeSymbol(symbol: string) {
    console.log('Favor List change symbol.' + symbol);
    this.symbol = symbol;
    this.ref.markForCheck();
  }

}
type PaneType = 'left' | 'right';
