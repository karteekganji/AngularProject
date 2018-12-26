import { Component, OnInit, ViewChild } from '@angular/core';
import { PracticeServicesService } from '../practice-services.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { SignupComponent } from '../signup/signup.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Constants } from '../constants';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})

export class LibraryComponent implements OnInit {
  librariesList: any = [];
  closeResult: string;
  formdata;
  //##### Material UI Code
  // dataSource: MatTableDataSource<any>;
  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // searchKey: string;
  // columnsToDisplay: string[] = ['position', 'name', 'address','actions'];
  constructor(private appcomp: AppComponent, private myservice: PracticeServicesService,
    private router: Router, private modalService: NgbModal, private toastr:ToastrService) { }
  ngOnInit() {

  }

  signUpData() {
    this.formdata = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(Constants.email_regex)]),
      password: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', [Validators.required,Validators.pattern(Constants.mobile_regex)]),
      name: new FormControl(
        '', [Validators.required]
      ),
      cityName: new FormControl('', [Validators.required]),
      gender: new FormControl('MALE', [Validators.required],),
      role:new FormControl('USER')
    });
  }
  getUserRole() {
    return this.appcomp.getUserRole();
  }
  getLibraries(event) {
    this.myservice.getService(PracticeServicesService.practiceApiList.getLibraries + "?cityName=" + event.target.value).subscribe(response => {
      this.librariesList = response.payLoad;

      //##### Material UI Code
      // this.dataSource = new MatTableDataSource(this.librariesList)
      // this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator;
    })
  }
  onDelete(data){
    this.myservice.deleteService(PracticeServicesService.practiceApiList.deleteLibrary+data).subscribe(response =>{
      if (response.status == "SUCCESS") {
        const item = this.librariesList.find(item => item.id === data);
        this.librariesList.splice(this.librariesList.indexOf(item));
        this.toastr.success("Library deleted succesfully")
      }else{
        this.toastr.error(response.errorMessage)
      }
    })
  }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getAllLibraryBooks(libraryId) {
    this.router.navigateByUrl("books?libId=" + libraryId)
  }

  getCities() {
    return this.appcomp.citiesList;
  }
}
