import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }
  from '@angular/forms';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { PracticeServicesService } from './../practice-services.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formdata;
  constructor(public myservice: PracticeServicesService, private http: Http, private router: Router,private toastr:ToastrService) { }
  getGenders: any = ["MALE", "FEMALE", "OTHERS"];
  ngOnInit() {
    this.signUpData();
  }
  signUpData() {
    this.formdata = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [Validators.required]),
      name: new FormControl(
        '', [Validators.required]
      ),
      cityName: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      role:new FormControl('USER')
    });
  }
  signUp(data) {
    this.myservice.postService(PracticeServicesService.practiceApiList.signUp, data).subscribe(response => {
      if (response.status == "SUCCESS") {
        this.toastr.success("Registration succesfully completed")
        this.router.navigateByUrl('')
      } else {
        this.toastr.error(response.errorMessage)
      }
    })
  }

  getCities() {
    return PracticeServicesService.citiesList;
  }
}
