import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignupFrom } from './signup/signup.component';

@Injectable({
  providedIn: 'root',
})


export class ApiService {
  constructor(private http: HttpClient) {}

  loginUser(loginData: any): Observable<any> {
    return this.http.post<any>('https://zomato-kj4c.onrender.com/login', loginData);
  }

  SignupDo(SignupData:SignupFrom):Observable<SignupFrom>{
  return this.http.post<any>("https://zomato-kj4c.onrender.com/Signup",SignupData)
 }

 fetchMovies():Observable<any>{
  return this.http.get<any>("http://127.0.0.1:3002/GetMovies")
 }
}
