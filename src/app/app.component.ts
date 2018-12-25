import { PracticeServicesService } from './practice-services.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }
  from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Library App';
  constructor(public myservice: PracticeServicesService, private toastr: ToastrService) { }
  form: FormGroup;
  public citiesList: any = [];
  ngOnInit() {
    this.getCities();
    setTimeout(() => {

    }, 500);

  }
  getUserRole() {
    return localStorage.getItem("Role");
  }
  getAuthtoken(){
    return localStorage.getItem("Auth-Token")
  }
  getCities() {
    return this.myservice.getService(PracticeServicesService.practiceApiList.getCities).subscribe(respose => {
      this.citiesList = respose.payLoad;
      error => {
        this.toastr.error(error)
      }
    });
  }

}
