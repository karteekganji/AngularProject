import { Constants } from './constants';
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/Rx';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
@Injectable()
export class PracticeServicesService {
  httpdata;
  baseUrl = Constants.Base_URL;
  constructor(private http: HttpClient, private toastr: ToastrService) {

  }
  ngOnInit() {

  }
  public static practiceApiList = {
    getCities: "api/get-cities",
    getAllBooks: "api/get-all-books",
    login: "api/login",
    getLibraries: "api/get-all-library",
    getLibraryBooks: "api/library-books/",
    signUp: "api/signup",
    logOut: "api/logout?auth=",
  }

  getService(url) {
    var localStorageVariable = '';
    if (localStorage.getItem('Auth-Token')) {
      localStorageVariable = localStorage.getItem('Auth-Token');
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Auth-Token': localStorageVariable
      })
    };
    console.log(httpOptions)
    return this.http.get(this.baseUrl + url, httpOptions).pipe(map((response: any) => response.json()));
  }
  postService(url, data) {
    var localStorageVariable = '';
    if (localStorage.getItem('Auth-Token')) {
      localStorageVariable = localStorage.getItem('Auth-Token');
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Auth-Token': localStorageVariable
      })
    };
    console.log(data)
    return this.http.post(this.baseUrl + url, data,httpOptions).pipe(map((response: any) => response.json()));
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
