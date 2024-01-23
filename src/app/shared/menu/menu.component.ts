import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  
  menuItemSelected!: string;

  menuItems: Array<PoMenuItem> = [
    {label: 'Home', icon: 'po-icon po-icon-home', shortLabel: 'Home', action: () => this.navigateTo('')},
    {label: 'Jogadores', icon: 'po-icon-star', shortLabel: 'Jogadores', action: () => this.navigateTo('players')},
    {label: 'Franquias', icon: 'po-icon po-icon-world', shortLabel: 'Franquias', action: () => this.navigateTo('franchises')}
  ]

  constructor(private _router: Router) {}

  private navigateTo(route: string): void {
    this._router.navigate([route]);
  }

  ngOnInit() {
  }
  
}
