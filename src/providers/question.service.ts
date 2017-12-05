import { Http, RequestOptions, Headers, Request, RequestMethod } from '@angular/http';
import { AppSettings } from '../helpers/app.settings';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class QuestionService {
   private baseUrl = AppSettings.apiUrl;

   constructor(private http: Http) {
   }

   getQuestionByUser(body) {
      return this.request(`getQuestionByUser`, RequestMethod.Post, body).map(response => response.json())
         .catch(this.handleServerError)
   }

   getQuestionByResults(body) {
      return this.request(`getQuestionByResults`, RequestMethod.Post, body).map(response => response.json())
         .catch(this.handleServerError)
   }

   getQuestionIdsFromResults(body) {
      return this.request(`getQuestionIdsFromResults`, RequestMethod.Post, body).map(response => response.json())
         .catch(this.handleServerError)
   }

   getQuestionById(body) {
      return this.request(`getQuestionById`, RequestMethod.Post, body).map(response => response.json())
         .catch(this.handleServerError)
   }

   deleteAnswers(id) {
      return this.request(`deleteAnswers/${id}`, RequestMethod.Delete).map(response => response.json())
         .catch(this.handleServerError)
   }

   updateAnswers(body) {
      return this.request('updateAnswers', RequestMethod.Post, body).map(response => response.json())
         .catch(this.handleServerError)
   }

   getAnswers(body) {
      return this.request('getAnswers', RequestMethod.Post, body).map(response => response.json())
         .catch(this.handleServerError)
   }

   insertAnswers(body) {
      return this.request('insertAnswers', RequestMethod.Post, body).map(response => response.json())
         .catch(this.handleServerError)
   }

   listQuestion() {
      return this.request('getQuestions', RequestMethod.Get).map(response => response.json())
         .catch(this.handleServerError)
   }

   createQuestion(body) {
      return this.request('createQuestion', RequestMethod.Post, body).map(response => response.json())
         .catch(this.handleServerError)
   }

   updateQuestion(body) {
      return this.request('updateQuestion', RequestMethod.Put, body).map(response => response.json())
         .catch(this.handleServerError)
   }

   deleteQuestion(guid) {
      return this.request(`deleteQuestion/${guid}`, RequestMethod.Delete).map(response => response.json())
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