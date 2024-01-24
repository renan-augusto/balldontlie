import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PoFieldModule, PoSelectOption } from '@po-ui/ng-components';
import { ICommonType } from 'src/app/models/common.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  @Input() title: string = '';
  @Input() options: PoSelectOption[] = [];
  @Input() placeholder?: string;
  @Input() required: boolean = false;
  @Input() isreadonly: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() tooltip?: string;
  @Input() multiselect: boolean = false;
  @Input() showRequired: boolean = false;
  @Input() hideSelectAll: boolean = false;
  @Input() search: boolean = false;
  @Input() sort: boolean = false;


  @Output() selected = new EventEmitter<PoSelectOption>();

  constructor() {}

  ngOnInit(): void {

  }

  onSelectionChange(selectedOption: PoSelectOption): void {
    this.selected.emit(selectedOption);
  }

}
