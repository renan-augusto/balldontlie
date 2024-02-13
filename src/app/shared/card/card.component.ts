import { Component, Input } from '@angular/core';
import { PoDynamicField } from '@po-ui/ng-components/lib/components/po-dynamic/po-dynamic-field.interface';
import { Players } from 'src/app/models/players.model';
import { Teams } from 'src/app/models/teams.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() disable: boolean = false;
  @Input() title: string = '';
  @Input() fields: PoDynamicField[] = [];
  @Input() value: Object = {}

  private _width: string = '200';

  @Input()
  set width(value: string) {
    this._width = value.endsWith('px') ? value : value = value + 'px';
  }

  get width() {
    return this._width;
  }
}
