import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService,private router:Router) {}

  login2() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.apiService.login(loginData).subscribe(response => {
      this.apiService.ok()
      localStorage.setItem("user",JSON.stringify(response))
      if(response[0]=="Login Successful"){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response[0],
          showConfirmButton: false,
          timer: 1500
        })

        this.router.navigate(["/"])
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response[0],
          
        })
      }
    
      console.log(response);
    }, error => {
    
      console.log('Login failed:', error);
    });
  }
}
