import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public menuItems = [
    { name: 'Dashboard', route: '/dashboard', },
    { name: 'Transactions', route: '/transactions', },
  ];
}

