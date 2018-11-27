import { PracticeServicesService } from './../practice-services.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs-compat/operator/map';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } 
    from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'Library App'; 
  constructor(public myservice: PracticeServicesService, private http: Http,private router: Router) {}
  booksList:any=[];
  citiesList:any=[];
  librariesList:any=[];
  
  cityName;
  email;
  formdata;
    
  form: FormGroup;

  ngOnInit() {
    this.getCities();
    this.formdata = new FormGroup({
      email: new FormControl("mzemxxie@spring.com"),
      password: new FormControl("spring@123"),
      cityName : new FormControl("HYDERABAD")
   });
  }
  getCities(){
    return this.myservice.getService(PracticeServicesService.practiceApiList.getCities).subscribe(respose => {
      this.citiesList = respose.payLoad;
    });
  }
 login(data) {
  this.myservice.postService(PracticeServicesService.practiceApiList.login,data).subscribe(response => {
    if(response.status == "SUCCESS"){
      localStorage.setItem("X-Authorization",response.payLoad.userDetails.auth)
      localStorage.setItem("Role",response.payLoad.userDetails.role)
      localStorage.setItem("City",data.cityName)
      this.librariesList = response.payLoad.libraries;
      alert("Login Success!!")
      this.router.navigateByUrl('dashboard');
    }else{
     alert("Login Failed!!")
    }
  })
 
 }

}
