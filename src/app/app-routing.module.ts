import { BooksComponent } from './books/books.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';

const appRoutes: Routes = [
  {path : '',component : LoginComponent},
  {path : 'dashboard',component : DashboardComponent},
  {path : 'books',component : BooksComponent},
  {path : 'signup',component : SignupComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes
      ),
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
