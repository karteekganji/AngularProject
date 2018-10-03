import { Constants } from './../constants';
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, ResponseContentType, Request } from '@angular/http';
import {
  HttpHeaders, HttpClient
} from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/of";

@Injectable({
  providedIn: 'root'
})
export class PracticeAPIService {

  constructor(private http: HttpClient, private httpN: Http, public route: Router) {
  }

   //  isLoggedIn:boolean;
   public static apisList = {
    login: 'session/authenticate',
    logout: 'clear-session',
    getDashboardData: "dashboard",
    getlofData: "lof-master-data",
    lofOrContract: "lof-or-contract", //Full form submit with single api
   }

   private handleError(error: Response | any) {
    let errorMessage: string;
    //let status = error.statusCode
    if (error.status !== 200 ) {
      setTimeout(() => { }, 1000);
    } 
    const body = error.json() || "";
    errorMessage = "Error";
    return Observable.throw(errorMessage);
  }


  post_service(url, data) :any{
    let headerJson = {
      "Content-Type": "application/json",
    };
    const httpOptions = {
      headers: new HttpHeaders(headerJson)
    };
    let BaseUrl = Constants.Base_URL;
    return this.http
      .post(BaseUrl + url, data, httpOptions)
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }
}
