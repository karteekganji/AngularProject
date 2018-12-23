import { ToastrService } from 'ngx-toastr';
import { PracticeServicesService } from './../practice-services.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }
  from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public myservice: PracticeServicesService, private router: Router, private toastr:ToastrService) { }
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

  login(data) {
    this.myservice.postService(PracticeServicesService.practiceApiList.login, data).subscribe(response => {
      if (response.status == "SUCCESS") {
        localStorage.setItem("Auth-Token", response.payLoad.userDetails.auth)
        localStorage.setItem("Role", response.payLoad.userDetails.role)
        this.librariesList = response.payLoad.libraries;
        this.toastr.success("Login Successfull")
        this.router.navigateByUrl('dashboard');
      } else {
        this.toastr.error(response.errorMessage)
      }
    })
  }

  signUp() {
    this.router.navigateByUrl("signup")
  }

}
