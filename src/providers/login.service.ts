import { Http, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { AppSettings } from '../helpers/app.settings';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
   private baseUrl = AppSettings.apiUrl;

   constructor(private http: Http) {
   }

   handleLogout() {
      localStorage.removeItem('currentUser');
   }

   handleAuthentication(body: any) {
      return this.request(`isAuthenticated`, RequestMethod.Post, JSON.stringify(body));
   }

   handleUserLogin(body: any) {
      return this.request(`login`, RequestMethod.Post, JSON.stringify(body))
         .map(response => response.json())
         .catch(this.handleServerError)
   }

   handleUserRegistration(body: any) {
      return this.request('register', RequestMethod.Post, JSON.stringify(body))
         .map(response => response.json())
         .catch(this.handleServerError)
   }

   confirmRegistration(body: any) {
      return this.request('confirmRegistration', RequestMethod.Post, JSON.stringify(body)).map(response => response.json())
         .catch(this.handleServerError)

   }

   isRegistered(body: any) {
      return this.request('isRegistered', RequestMethod.Post, JSON.stringify(body)).map(response => response.json())
         .catch(this.handleServerError)

   }

   sendPasswordReset(body: any) {
      return this.request('resetPassword', RequestMethod.Post, JSON.stringify(body)).map(response => response.json())
         .catch(this.handleServerError)

   }

   updatePassword(body: any) {
      return this.request('updatePassword', RequestMethod.Post, JSON.stringify(body)).map(response => response.json())
         .catch(this.handleServerError)

   }

   private request(endpoint: string, method: RequestMethod, body?: Object) {
      const requestOptions: RequestOptions = new RequestOptions({
         url: `${this.baseUrl}${endpoint}`,
         method: method,
         headers: new Headers({
            'Content-Type': 'application/json'
         })
      })

      if (body) {
         requestOptions.body = body;
      }
      const request = new Request(requestOptions);

      return this.http.request(request);
   }

   protected handleServerError(error: any) {
      return Observable.throw('An error occured while processing request.');
   }

}