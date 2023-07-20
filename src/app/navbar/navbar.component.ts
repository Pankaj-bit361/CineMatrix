import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  data: any[] = [];

  isLoggedIn: boolean = false;

  constructor(private authService: ApiService) {}

  ngOnInit() {
    this.data = JSON.parse(localStorage.getItem('user') ?? '[]');
 
  
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout() {
    this.authService.logout();
  }

}
