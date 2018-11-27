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
  booksList:any=[];

  form: FormGroup;
  ngOnInit() {
   
  }
  greet():void { 
    console.log("Hello World!!!") 
 }

getAllBooks(){
  return this.myservice.getService(PracticeServicesService.practiceApiList.getAllBooks).subscribe(respose => {
    this.booksList = respose.payLoad;
  });
}

}
