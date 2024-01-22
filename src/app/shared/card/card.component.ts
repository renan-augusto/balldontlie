import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() height: number = 300;
  @Input() disable: boolean = false;
  @Input() title!: string;
  // @Input() width: string = '200px';

  private _width: string = '200';

  @Input()
  set width(value: string) {
    this._width = value.endsWith('px') ? value : value = value + 'px';
  }

  get width() {
    return this._width;
  }
}
