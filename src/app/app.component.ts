import { PracticeServicesService } from './practice-services.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs-compat/operator/map';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } 
    from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'Library App'; 
  constructor(public myservice: PracticeServicesService, private http: Http) {}
  form: FormGroup;
  ngOnInit() {
   this.getCities();
  }
  greet():void { 
    console.log("Hello World!!!") 
 }

 getCities(){
  return this.myservice.getService(PracticeServicesService.practiceApiList.getCities).subscribe(respose => {
    PracticeServicesService.citiesList = respose.payLoad;
  });
}

}
