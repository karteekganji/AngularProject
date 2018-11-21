import { PracticeServicesService } from './practice-services.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path : 'login-cmp',
        component : LoginComponent
      }
    ])
  ],
  providers: [PracticeServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
