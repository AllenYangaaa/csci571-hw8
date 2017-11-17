import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutoCompleteListService} from '../auto-complete-list.service';
import { SymbolService} from "../symbol.service";
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchFormComponent implements OnInit {

  stockSymbol = '';
  stockForm: FormGroup;

  debugInfo = [];

  options: any[] = [];



  parseOptions(results: Object[]) {
    this.debugInfo = [];
    this.options = [];
    for (const option of results) {
      console.log(option);
      this.debugInfo.push('a object ' + option['Name']);
      this.options.push({
        name: option['Symbol'],
        disp: option['Symbol'] + ' - ' + option['Name'] + ' (' + option['Exchange'] + ')'
      }
      );
    }
  }

  trackNameChange() {
    const nameControl = this.stockForm.get('name');
    nameControl.valueChanges.forEach(
      (value: string) => this.updateName(value)
    );
  }

  updateName(name: string) {
    this.autoCompleteListService.getSymbolList(name).subscribe(
      // symbolList => this.options = symbolList
      // res => this.debugInfo = res[0]['Name']
      res => this.parseOptions(res)
    );
  }

  createForm() {
    this.stockForm = this.fb.group({
      name: ['',[
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$')]
      ],
    });
  }

  onSubmit() {
    console.log("onSubmit");
    this.stockSymbol = this.stockForm.get('name').value;
    this.symbolService.setSymbol(this.stockSymbol);
  }

  clear() {
    this.stockForm.setValue({
      name: ''
    });
  }

  ngOnInit() {
  }

  constructor(
    private fb: FormBuilder,
    private autoCompleteListService: AutoCompleteListService,
    public symbolService: SymbolService
  ) {
    this.createForm();
    this.trackNameChange();
  }
}
