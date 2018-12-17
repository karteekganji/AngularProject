import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { PracticeServicesService } from '../practice-services.service';
@Injectable(
)
export class LoginGaurdService implements CanActivate{

  constructor(public service: PracticeServicesService, public router: Router) { }

  canActivate(){
    if (this.service.isLogin()){
      return true;
    }
    else{
      this.router.navigateByUrl('');
      return false;
    }
  }
}
