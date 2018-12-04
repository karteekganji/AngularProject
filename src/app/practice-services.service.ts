import { Constants } from './constants';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient
} from '@angular/common/http';
import { Http } from '@angular/http';
@Injectable({
  providedIn: 'root'
})
export class PracticeServicesService {
  httpdata;
  baseUrl = Constants.Base_URL;
  constructor(private http: Http) {}
  ngOnInit() {
   
  }
  public static citiesList :any = [];
  public static practiceApiList = {
    getCities : "get-cities",
    getAllBooks : "get-all-books",
    login :"login",
    getLibraries :"get-all-library",
    getLibraryBooks :"library-books/",
    signUp :"signup",
  }

  getService(url){
    return this.http.get(this.baseUrl+url)
    .map(response =>  response.json())
  }
  postService(url, data){
    console.log(data)
    return this.http.post(this.baseUrl+url,data)
    .map(response => response.json())
  }
}
