import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { PracticeServicesService } from '../practice-services.service';

@Injectable()
export class HomeGaurdService implements CanActivate {

  constructor(public service: PracticeServicesService, public router: Router) {
  }
  canActivate(){
    if (!this.service.isLogin()){
      return true;
    }
    else{
      this.router.navigateByUrl("dashboard");
      return false;
    }
  }
}
