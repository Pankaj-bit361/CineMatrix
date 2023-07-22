import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

constructor(private router:Router){}

GoToHome(){
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Payment Done Successfulluy',
    showConfirmButton: false,
    timer: 1500
  })
  localStorage.removeItem("paymentData")
  this.router.navigate(["/"])
}


}
