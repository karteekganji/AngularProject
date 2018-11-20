import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Angular 4 Practice Session'; 
  course = ["Course1", "Course2", "Course3"];
  courseDisplay = true;
  months = ["January", "Feburary", "March", "April", "May", 
  "June", "July", "August", "September",
  "October", "November", "December"];
  getTitle(){
    return this.title;
  }

  clickFunction(event){
    alert("Click function alert!!")
    console.log(event)
  }
  changeFunction(event){
    alert("Changed month from the Dropdown");
  }
  greet():void { 
    console.log("Hello World!!!") 
 } 
 
} 
