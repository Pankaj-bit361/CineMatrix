import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface ok{
  ticketTypes:any[];
  totalprice:number
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})




export class CheckoutComponent {
  payment: ok = { ticketTypes: [], totalprice: 0 };
  data:any[]=[]
  membership:any
  discounted:any
constructor(private router:Router){}


ngOnInit(){
this.payment=JSON.parse(localStorage.getItem("paymentData")??"[]")
this.data=[]=JSON.parse(localStorage.getItem("user")?? "[]")
console.log(this.payment)
if(this.data[1].plans=="Gold"){
  this.membership=20
}else if(this.data[1].plans=="Premium"){
  this.membership=30
}else{
  this.membership=0
}
if(this.data[1].plans=="Premium" || this.data[1].plans=="Gold"){
  
  this.discounted=(this.payment.totalprice*(+this.membership))/100
  this.discounted=this.payment.totalprice-this.discounted+50
  console.log(this.discounted)
}else if(this.data[1].plans=="Regular"){
  this.discounted=this.payment.totalprice+50
}


}

ProceedToPayment(){
  this.router.navigate(["/payment"])
}


}
