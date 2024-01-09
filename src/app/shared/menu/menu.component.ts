import { Component } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {  

  menuItems: Array<PoMenuItem> = [
    {label: 'Jogadores', icon: 'po-icon-star', shortLabel: 'Jogadores'},
    {label: 'Franquias', icon: 'po-icon po-icon-world', shortLabel: 'Franquias'}
  ]

  
  ngOnInit() {
  }
  
}
