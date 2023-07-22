import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  data: any = {}; // Change the data type to object

  isLoggedIn: boolean = false;

  constructor(private authService: ApiService) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;

      // Update the data variable with the user data from localStorage
      this.data = JSON.parse(localStorage.getItem('user') ?? '{}');
    });
  }

  logout() {
    this.authService.logout();
  }
}