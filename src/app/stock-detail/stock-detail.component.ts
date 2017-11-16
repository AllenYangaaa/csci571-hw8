import { Component, OnInit, ViewEncapsulation, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StockDetailComponent implements OnInit {

  @Output() toSlide: EventEmitter<PaneType> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  slidePanel() {
    console.log('emit');
    this.toSlide.emit('left');
  }
}
type PaneType = 'left' | 'right';
