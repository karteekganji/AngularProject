import { ToastrService } from 'ngx-toastr';
import { PracticeServicesService } from './../practice-services.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }
  from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public myservice: PracticeServicesService, private router: Router,
    private toastr: ToastrService, private appcomp: AppComponent) { }
  librariesList: any = [];
  formdata;
  ngOnInit() {
    this.loginData();
  }


  loginData() {
    this.formdata = new FormGroup({
      email: new FormControl("email@admin.com"),
      password: new FormControl("admin")
    });
  }

  getUserRole() {
    return this.appcomp.getUserRole();
  }
  getAuthtoken(){
    return this.appcomp.getAuthtoken();
  }
  login(data) {
    this.myservice.postService(PracticeServicesService.practiceApiList.login, data).subscribe(response => {
      if (response.status == "SUCCESS") {
        localStorage.setItem("Auth-Token", response.payLoad.userDetails.auth)
        localStorage.setItem("Role", response.payLoad.userDetails.role)
        this.librariesList = response.payLoad.libraries;
        this.toastr.success("Login Successfull")
        this.router.navigateByUrl('library');
      } else {
        this.toastr.error(response.errorMessage)
      }
    })
  }

  signUp() {
    this.router.navigateByUrl("signup")
  }

}
