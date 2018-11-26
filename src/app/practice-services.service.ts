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
  getService(url){
    return this.http.get(this.baseUrl+url).
    map(response =>  response.json())
  }
}
