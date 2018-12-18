import { Constants } from './constants';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {
  HttpClient, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class PracticeServicesService {
  httpdata;
  baseUrl = Constants.Base_URL;
  constructor(private http: HttpClient, private toastr: ToastrService) {

  }
  ngOnInit() {

  }
  public static practiceApiList = {
    getCities: "get-cities",
    getAllBooks: "get-all-books",
    login: "login",
    getLibraries: "get-all-library",
    getLibraryBooks: "library-books/",
    signUp: "signup",
    logOut: "logout?auth=",
  }

  getService(url) {
    var localStorageVariable = '';
    if (localStorage.getItem('Auth-Token')) {
      localStorageVariable = localStorage.getItem('Auth-Token');
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.get(this.baseUrl + url, httpOptions).map((response) => {
      return response;
    }).catch(this.handleError);
  }
  postService(url, data) {
    console.log(data)
    return this.http.post(this.baseUrl + url, data)
      .map((response) => { 
        return response }).catch(this.handleError);
  }
  isLogin() {
    if (localStorage.getItem("Auth-Token")) {
      return true;
    } else {
      return false;
    }
  }

  handleError(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
}
