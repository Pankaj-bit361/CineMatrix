import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignupFrom } from './signup/signup.component';
import { tap } from 'rxjs/operators';

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
    return this.http.post<any>('https://matrix-mabh.onrender.com/login', loginData)
      .pipe(
        tap(() => {
          this.isLoggedInSubject.next(true);
        })
      );
  }
  
  ok() {
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
    return this.http.post<SignupFrom>('https://matrix-mabh.onrender.com/Signup', SignupData);
  }

  fetchMovies(): Observable<any> {
    return this.http.get<any>('https://matrix-mabh.onrender.com/GetMovies');
  }

  fetchSingleData(id: any): Observable<any> {
    return this.http.get<any>(`https://matrix-mabh.onrender.com/GetMovies/${id}`);
  }

fetchcinemaData(name:any,location:any):Observable<any>{
  return this.http.get<any>(`https://matrix-mabh.onrender.com/movie/${name}?location=${location}`)
}
fetchlocationData(name:string,location:string):Observable<any>{
  return this.http.get<any>(`https://matrix-mabh.onrender.com/getLocation/${name}?location=${location}`)
}

patchprofileData(id:any,ob:object):Observable<any>{
  return this.http.patch<any>(`https://matrix-mabh.onrender.com/Signup/${id}`,ob)
}

}
