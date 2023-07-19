import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService,private router:Router) {}

  login() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.apiService.loginUser(loginData).subscribe(response => {
      localStorage.setItem("user",JSON.stringify(response))
      if(response[0]=="Login Successful"){
        alert(response[0])
        this.router.navigate(["/"])
      }
    
      console.log(response);
    }, error => {
    
      console.log('Login failed:', error);
    });
  }
}
