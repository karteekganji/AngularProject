import { PracticeAPIService } from './../API/practice-api.service';
import { Component, OnInit } from '@angular/core';
import { Constants } from '../constants';
import { Http, Response } from '@angular/http';
import  'rxjs-compat/operator/map';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email;
  password;
  cityCode;
  constructor(private router: Router, private api: PracticeAPIService) { }

  ngOnInit() {
  }

  login(){
    let data =
      {
        email: this.email,
        userDetails: this.password,
        cityCode:this.cityCode
      }

      this.api.post_service(PracticeAPIService.apisList.login, data).subscribe(response => {
        if(response.status === 'SUCCESS'){
          this.router.navigateByUrl('library');
        }
    
      });

    }
}
