import { ToastrService } from 'ngx-toastr';
import { Http } from '@angular/http';
import { PracticeServicesService } from './../practice-services.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public myservice: PracticeServicesService, private http: Http, private router: Router, private toastr:ToastrService) { }
  auth: string;
  ngOnInit() {
    this.auth = localStorage.getItem("Auth-Token");
    console.log(this.auth)
  }
  logOut(data) {
    this.myservice.postService(PracticeServicesService.practiceApiList.logOut+this.auth,data).subscribe(response => {
      if (response.status == "SUCCESS") {
        this.toastr.success(response.errorMessage)
        localStorage.clear()
        this.auth = null
        this.router.navigateByUrl('')
      }else{
        this.toastr.error(response.errorMessage)
      }
    })
  }
}
