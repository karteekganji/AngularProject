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
  constructor(public myService: PracticeServicesService, private router: Router,
    private toastr: ToastrService, private appcomp: AppComponent) { }
  librariesList: any = [];
  loginFormData;
  changePwdConFormData;
  passwordKey="";
  forgotPwdEmail:String = "";
  showConfirmFields:boolean = false;
  ngOnInit() {
    this.loginData();
    this.changePasswordData();
  }


  loginData() {
    this.loginFormData = new FormGroup({
      email: new FormControl("email@admin.com", [Validators.required]),
      password: new FormControl("admin", [Validators.required])
    });
  }

  changePasswordData() {
    this.changePwdConFormData = new FormGroup({
      passwordKey: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  getUserRole() {
    return this.appcomp.getUserRole();
  }
  getAuthtoken(){
    return this.appcomp.getAuthtoken();
  }
  login(data) {
    this.myService.postService(PracticeServicesService.practiceApiList.login, data).subscribe(response => {
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

  forgotPassword(email:String){
    this.myService.getService(PracticeServicesService.practiceApiList.forgotPassword+email).subscribe(response =>{
      if (response.status == 'SUCCESS') {
        this.passwordKey = response.payLoad.passwordKey;
        this.showConfirmFields = true;
        console.log(this.showConfirmFields)
      }
      else{
        this.toastr.error(response.errorMessage)
      }
    })
  }

}
