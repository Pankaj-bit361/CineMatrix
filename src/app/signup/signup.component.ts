import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

export interface SignupFrom{
  username:string
  email:string
  password:string
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  username:string=""
  email:string=""
  password:string=""

  constructor(private apiservice:ApiService,private router:Router){}
  

  teleport(){
    console.log("hello")
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Account Created Successfulluy',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate(["/login"])
     }
    
  SignupUser(){
    const Signupdata={
      username:this.username,
      email:this.email,
      password:this.password
    }


this.apiservice.SignupDo(Signupdata).subscribe((res)=>{
  console.log(res)

})



  }

}
