import {HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {BeehiveData} from "./beehive.service";

const BASE_URL = ['http://158.160.151.134:8080/']

@Injectable({
  providedIn: 'root'
})
export class AuthService  implements HttpInterceptor{

  constructor(
    private http: HttpClient
  ) { }

  signup(signupRequest: any): Observable<any> {
    return this.http.post(BASE_URL + "sign-up", signupRequest)
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + "sign-in", loginRequest)
  }

  getAllBeehiveData(): Observable<BeehiveData[]> {
    return this.http.get<BeehiveData[]>(BASE_URL + 'mainpage', {
      headers: this.createAuthorizationHeader()
    });
  }

  private createAuthorizationHeader() {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      return new HttpHeaders().set(
        'Authorization', 'Bearer ' + jwtToken
      )
    } else {
      console.log("JWT token not found in the Local Storage");
    }
    return null;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }

}
