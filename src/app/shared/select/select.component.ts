import { Component, Input } from '@angular/core';
import { PoFieldModule } from '@po-ui/ng-components';
import { ICommonType } from 'src/app/models/common.models';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  @Input() title: string = '';
  @Input() options: ICommonType[] = []

  constructor() {}

  ngOnInit(): void {

  }

}
