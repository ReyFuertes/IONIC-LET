
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Request, RequestMethod } from '@angular/http';
import { AppSettings } from './../helpers/app.settings';

@Injectable()
export class MajoringService {
   private baseUrl = AppSettings.apiUrl;

   constructor(private http: Http) {}

   getMajorings() {
      return this.http.get(`${this.baseUrl}getMajorings`).map(response => response.json())
         .catch(this.handleServerError)
   }

   protected handleServerError(error: any) {
      return Observable.throw('An error occured while processing request.');
   }

}