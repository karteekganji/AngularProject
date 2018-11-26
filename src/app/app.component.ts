import { PracticeServicesService } from './practice-services.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs-compat/operator/map';
import { Http } from '@angular/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'Cricket App'; 
  course = ["Course1", "Course2", "Course3"];
  courseDisplay = true;
  months = ["January", "Feburary", "March", "April", "May", 
  "June", "July", "August", "September",
  "October", "November", "December"];
  todaydate;
  constructor(public myservice: PracticeServicesService, private http: Http) {}
  booksList:any=[];
  ngOnInit() {
    
  }
  getTitle(){
    return this.title;
  }
  clickFunction(event){
    alert("Click function alert!!")
    console.log(event)
  }
  changeFunction(){
    alert("Changed month from the Dropdown");
  }
  greet():void { 
    console.log("Hello World!!!") 
 }

 onClickSubmit(data) {
   console.log(data)
  alert("Entered Email id : " + data.emailid);
}

getAllBooks(){
  return this.myservice.getService("get-all-books").subscribe(respose => {
    this.booksList = respose.payLoad;
  });
}

}
