import { Router } from '@angular/router';
import { LoginComponent } from './../login/login.component';
import { PracticeServicesService } from './../practice-services.service';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  librariesList: any = [];
  user_role:string;
  constructor(private appcomp:AppComponent,private myservice: PracticeServicesService, private loginComp: LoginComponent, private router: Router) { }
  ngOnInit() {
  this.user_role = localStorage.getItem("Role");
  }
  getLibraries(event) {
    this.myservice.getService(PracticeServicesService.practiceApiList.getLibraries + "?cityName=" + event.target.value).subscribe(response => {
      this.librariesList = response.payLoad;
    })
  }

  getAllLibraryBooks(libraryId) {
      this.router.navigateByUrl("books?libId="+libraryId)
    }
  
  getCities() {
    return this.appcomp.citiesList;
  }
}
