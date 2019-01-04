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
  booksList:any = [];
  constructor(public myService: PracticeServicesService, private router: Router, private toastr: ToastrService,public appcomp:AppComponent) { }
  auth: any;
  ngOnInit() {
  }
  authtoken(){
    return this.appcomp.getAuthtoken();
  }
  getUserRole(){
  return this.appcomp.getUserRole(); 
  }
  imgClick(){
    this.router.navigateByUrl('')
  }
  logOut(data) {
    this.myService.postService(PracticeServicesService.practiceApiList.logOut, data).subscribe(response => {
      if (response.status == "SUCCESS") {
        this.toastr.success(response.errorMessage)
        localStorage.clear()
        this.router.navigateByUrl('')
      } else {
        this.toastr.error(response.errorMessage)
      }
    })
  }
  clickLibrary(){
    this.router.navigateByUrl("library")
  }
  clickBooks(){
    this.router.navigateByUrl("books")
  }

}
