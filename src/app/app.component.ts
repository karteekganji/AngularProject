import { Constants } from './constants';
import { PracticeAPIService } from './API/practice-api.service';
import { Component } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Practice Session';
  data: any = {};

constructor(private http : Http){

}

}
