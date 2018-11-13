import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `<h2>{{getTitle()}}</h2>
  <ul>
  <li *ngFor="let data of course">
  {{data}}
  </li>
  </ul>
  `
})
export class AppComponent {
  title = 'Practice Session'; 
  course = ["Course1", "Course2", "Course3"];

  getTitle(){
    return this.title;
  }
} 
