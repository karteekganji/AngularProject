import { LibraryBooksComponent } from './library-books/library-books.component';
import { BooksComponent } from './books/books.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeGaurdService } from './route-gaurd/home-gaurd.service';
import { LoginGaurdService } from './route-gaurd/login-gaurd.service';
import { LibraryComponent } from './library/library.component';


const appRoutes: Routes = [
  { path: '', component: LoginComponent, canActivate: [HomeGaurdService] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [LoginGaurdService] },
  { path: 'books', component: BooksComponent, canActivate: [LoginGaurdService] },
  { path: 'library', component: LibraryComponent, canActivate: [LoginGaurdService] },
  { path: 'signup', component: SignupComponent, canActivate: [HomeGaurdService] },
  {
    path: 'library',
    children: [ //<---- child components declared here
      {
        path: 'librarybooks',
        component: LibraryBooksComponent, canActivate: [LoginGaurdService]
      },
    ]
  },
  { path: '**', component: PageNotFoundComponent },
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
export const RoutingComponent = [
  LoginComponent,
  DashboardComponent,
  BooksComponent,
  SignupComponent,
  LibraryComponent,
  PageNotFoundComponent,
  LibraryBooksComponent
]
