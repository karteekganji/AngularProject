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
  constructor(public myservice: PracticeServicesService, private http: Http,private router: Router) { }

  ngOnInit() {
    this.signUpData();
  }
  signUpData(){
    this.formdata = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      mobileNumber : new FormControl(),
      name : new FormControl(),

   });
  }
  signUp(data){
    this.myservice.postService(PracticeServicesService.practiceApiList.signUp,data).subscribe(response => {
      if(response.status == "SUCCESS"){
       alert("SignUp Success")
      }else{
       alert("SignUp Failed!!")
      }
    })
  }
}
