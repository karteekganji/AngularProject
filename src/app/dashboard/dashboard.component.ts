import { Router } from '@angular/router';
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
  libraryBooksList:any=[];
  constructor(private myservice :PracticeServicesService, private loginComp :LoginComponent, private router : Router) {}
  ngOnInit() {
    this.getLibraries();
  }

  getLibraries(){
 this.myservice.getService(PracticeServicesService.practiceApiList.getLibraries+"?cityName="+localStorage.getItem("City")).subscribe(response =>{
   this.librariesList = response.payLoad;
 })
  }
  getCity(){
    return localStorage.getItem("City");
  }
  getAllLibraryBooks(libraryId) { 
    
    this.myservice.getService(PracticeServicesService.practiceApiList.getLibraryBooks+libraryId).subscribe(response => {
    this.libraryBooksList = response.payLoad;
    this.router.navigateByUrl("books")
    })
 }

}
