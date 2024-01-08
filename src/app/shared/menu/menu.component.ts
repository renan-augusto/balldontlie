import { Component } from '@angular/core';
import { IMenuItem } from 'src/app/models/common.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {  
  menuItems: IMenuItem[] = [
    {label: 'Jogadores', link: ''},
    {label: 'Franquias', link: ''}
  ];
  
  ngOnInit() {
  }
  
}
