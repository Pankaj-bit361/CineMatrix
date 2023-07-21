import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignupFrom } from './signup/signup.component';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedData = localStorage.getItem('user');
    if (storedData) {
      this.isLoggedInSubject.next(true);
    }
  }

  login(loginData: any): Observable<any> {
    return this.http.post<any>('http://localhost:3002/login', loginData);
  }
 ok(){
  this.isLoggedInSubject.next(true);
 }
  logout() {
   
    localStorage.removeItem('user');
    this.isLoggedInSubject.next(false);
  }

  setLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
    if (value) {
      localStorage.setItem('user', JSON.stringify({ isLoggedIn: true }));
    } else {
      localStorage.removeItem('user');
    }
  }

  SignupDo(SignupData: SignupFrom): Observable<SignupFrom> {
    return this.http.post<SignupFrom>('http://localhost:3002/Signup', SignupData);
  }

  fetchMovies(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:3002/GetMovies');
  }

  fetchSingleData(id: any): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:3002/GetMovies/${id}`);
  }

fetchcinemaData(name:any,location:any):Observable<any>{
  return this.http.get<any>(`http://127.0.0.1:3002/movie/${name}?location=${location}`)
}
fetchlocationData(name:string,location:string):Observable<any>{
  return this.http.get<any>(`http://127.0.0.1:3002/getLocation/${name}?location=${location}`)
}
}
