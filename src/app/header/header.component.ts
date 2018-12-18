import { AppComponent } from './../app.component';
import { ToastrService } from 'ngx-toastr';
import { PracticeServicesService } from './../practice-services.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public myservice: PracticeServicesService, private router: Router, private toastr: ToastrService,public appcomp:AppComponent) { }
  auth: any;

  ngOnInit() {
    this.auth = localStorage.getItem("Auth-Token");
  }
  authtoken():string{
    return localStorage.getItem("Auth-Token")
  }
  imgClick(){
    this.router.navigateByUrl('')
  }
  logOut(data) {
    this.myservice.postService(PracticeServicesService.practiceApiList.logOut + this.authtoken(), data).subscribe(response => {
      if (response.status == "SUCCESS") {
        this.toastr.success(response.errorMessage)
        localStorage.clear()
        this.router.navigateByUrl('')
      } else {
        this.toastr.error(response.errorMessage)
      }
    })
  }
}
