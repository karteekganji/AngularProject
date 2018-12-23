import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule, RoutingComponent } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PracticeServicesService } from './practice-services.service';
import { HomeGaurdService } from './route-gaurd/home-gaurd.service';
import { LoginGaurdService } from './route-gaurd/login-gaurd.service';
import { DataTablesModule } from 'angular-datatables';
import { LibraryComponent } from './library/library.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { MaterialUiModule } from './material-ui/material-ui.module';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    LibraryComponent,
    SidemenuComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    DataTablesModule,
    MaterialUiModule,
    ToastrModule.forRoot({
    }),
  ],
  providers: [RoutingComponent,PracticeServicesService,HomeGaurdService,LoginGaurdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
