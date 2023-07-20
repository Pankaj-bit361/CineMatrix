import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SingleComponent } from './single/single.component';

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
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
