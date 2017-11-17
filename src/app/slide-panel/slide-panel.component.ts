import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {
  animate, state, style, transition, trigger
} from '@angular/animations';
import { SymbolService } from "../symbol.service";

@Component({
  selector: 'app-slide-panel',
  templateUrl: './slide-panel.component.html',
  styleUrls: ['./slide-panel.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', [
      state('left', style({transform: 'translateX(0)'})),
      state('right', style({transform: 'translateX(-50%)'})),
      transition('* => *', animate(300))
    ])]
})
export class SlidePanelComponent implements OnInit {

  @Input() activePane: PaneType = 'left';

  constructor(
    public symbolService : SymbolService
  ) {
    symbolService.symbolChange$.subscribe(
      symbol => {
        this.switchPanel('right');
      }
    );
  }

  ngOnInit() {
  }

  switchPanel(panel: PaneType) {
    console.log('switch');
    this.activePane = panel;
  }
}

type PaneType = 'left' | 'right';
