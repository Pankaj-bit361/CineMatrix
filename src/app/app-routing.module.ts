import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SingleComponent } from './single/single.component';
import { CinemaComponent } from './cinema/cinema.component';
import { SeatsComponent } from './seats/seats.component';
import { ProfileComponent } from './profile/profile.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    component:HomeComponent,
    path:""
  },

  {
    component:LoginComponent,
    path:"login"
  },


   {
    component:SignupComponent,
    path:"signup"
   },
   {
    component:SingleComponent,
    path:"single/:id"
   },
   {
    component:CinemaComponent,
    path:"cinema/:title"
   },
  {
    component:SeatsComponent,
    path:"seats"
  },
  {
    component:ProfileComponent,
    path:"profile"
  },
  {
    component:CheckoutComponent,
    path:"checkout"
  },
  {
    component:PaymentComponent,
    path:"payment"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
