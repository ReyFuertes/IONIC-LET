import { Http, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { AppSettings } from '../helpers/app.settings';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ExamService {
   private baseUrl = AppSettings.apiUrl;

   constructor(private http: Http) {

   }

   getSummaryResults(body) {
      return this.request('getSummaryResults', RequestMethod.Post, body).map(response => response.json())
         .catch(this.handleServerError)
   }

   getEarnedPoints(body) {
      return this.request('getEarnedPoints', RequestMethod.Post, body).map(response => response.json())
         .catch(this.handleServerError)
   }

   getSumTotalPoints(body) {
      return this.request('getSumTotalPoints', RequestMethod.Post, body).map(response => response.json())
         .catch(this.handleServerError)
   }

   getTotalForCategory(body) {
      return this.request('getTotalForCategory', RequestMethod.Post, body).map(response => response.json())
         .catch(this.handleServerError)
   }

   checkAnswers(body) {
      return this.request('checkAnswers', RequestMethod.Post, body).map(response => response.json())
         .catch(this.handleServerError)
   }

   getAnswersByQuestion(body) {
      return this.request('getAnswersByQuestion', RequestMethod.Post, body).map(response => response.json())
         .catch(this.handleServerError)
   }

   getExamCategories() {
      return this.request('getExamByCategories', RequestMethod.Get).map(response => response.json())
         .catch(this.handleServerError)
   }

   getTabCategories(body) {
      return this.request('getTabCategories', RequestMethod.Post, body).map(response => response.json())
         .catch(this.handleServerError)
   }

   getExamQuestionsByCategory(body) {
      return this.request('getExamQuestionsByCategory', RequestMethod.Post, body).map(response => response.json())
         .catch(this.handleServerError)
   }

   getTabMajoringCategory(body) {
      return this.request('getTabMajoringCategory', RequestMethod.Post, body).map(response => response.json())
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


   //handle server error
   protected handleServerError(error: any) {
      return Observable.throw('An error occured while processing request.');
   }


}