import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 
})
export class AppComponent {
  title = 'Practice Session'; 
  course = ["Course2", "Course2", "Course2"];
  getTitle(){
    return this.title;
  }

  greet():void { 
    console.log("Hello World!!!") 
 } 
 
} 
