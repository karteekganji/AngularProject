import { LoginComponent } from './../login/login.component';
import { PracticeServicesService } from './../practice-services.service';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  librariesList:any=[];
  constructor(private myservice :PracticeServicesService, private loginComp :LoginComponent) {}
  ngOnInit() {
    this.getLibraries();
  }

  getLibraries(){
 this.myservice.getService(PracticeServicesService.practiceApiList.getLibraries+"?cityName="+localStorage.getItem("City")).subscribe(response =>{
   this.librariesList = response.payLoad;
   console.log(this.librariesList)
 })
  }
  getCity(){
    return localStorage.getItem("City");
  }
}
