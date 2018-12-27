import { BooksComponent } from './books/books.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeGaurdService } from './route-gaurd/home-gaurd.service';
import {LoginGaurdService} from './route-gaurd/login-gaurd.service';
import { LibraryComponent } from './library/library.component';
import { SampleComponent } from './sample/sample.component';


const appRoutes: Routes = [
  {path : '',component : LoginComponent,canActivate: [HomeGaurdService]},
  {path : 'dashboard',component : DashboardComponent,canActivate: [LoginGaurdService]},
  {path : 'books',component : BooksComponent,canActivate: [LoginGaurdService]},
  {path : 'signup',component : SignupComponent,canActivate: [HomeGaurdService]},
  {path : 'library',component : LibraryComponent,canActivate: [LoginGaurdService]},
  {path : 'sample',component : SampleComponent},
  {path : '**',component : PageNotFoundComponent},
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
export const RoutingComponent = [LoginComponent,DashboardComponent,BooksComponent,SignupComponent,LibraryComponent,PageNotFoundComponent]
