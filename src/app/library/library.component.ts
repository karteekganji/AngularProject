import { DataTablesModule } from 'angular-datatables';
import { AppComponent } from './../app.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PracticeServicesService } from '../practice-services.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { SignupComponent } from '../signup/signup.component';
import { NgbModal, ModalDismissReasons, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Constants } from '../constants';
import swal from 'sweetalert2/dist/sweetalert2.js'
import { DataSource } from '@angular/cdk/table';
import { library } from '@fortawesome/fontawesome-svg-core';
declare var swal: any;

class Library {
  public name: string = '';
  public address: string = '';
  public isActive: boolean = true;
  public cityId: number;
  public id:number;
  constructor(values?: any) {
    Object.assign(this, values);
  }
  setData(payload?: any) {
    if (payload) {
      this.name = payload.name;
      this.address = payload.address;
      this.isActive = payload.isActive;
      this.cityId = payload.city.id;
      this.id = payload.id;
    } else {
      this.name = '';
      this.address = '';
      this.isActive = true;
      this.cityId = null;
    }
  }
}

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})

export class LibraryComponent implements OnInit {
  librariesList: any = [];
  closeResult: string;
  formdata;
  library = new Library();
  buttonText = "Create";
  //##### Material UI Code
  // dataSource: MatTableDataSource<any>;
  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // searchKey: string;
  // columnsToDisplay: string[] = ['position', 'name', 'address','actions'];
  constructor(private appcomp: AppComponent, private myservice: PracticeServicesService,
    private router: Router, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit() {
    this.getCities();
  }

  getUserRole() {
    return this.appcomp.getUserRole();
  }
  getLibraries(event) {
    console.log("Target event -------",event);
    // console.log("event is ",event.target.value);
    if(event.target)
    {      
      if(event.target.value)
    {
      this.myservice.getService(PracticeServicesService.practiceApiList.getLibraries + "?cityId=" + event.target.value).subscribe(response => {
        this.librariesList = response.payLoad;
  
        //##### Material UI Code
        // this.dataSource = new MatTableDataSource(this.librariesList)
        // this.dataSource.sort = this.sort;
        // this.dataSource.paginator = this.paginator;
      })
    }
    }
    else
    {
      this.myservice.getService(PracticeServicesService.practiceApiList.getLibraries + "?cityId=" + event).subscribe(response => {
        this.librariesList = response.payLoad;
      })
    }
  }
  onDelete(data) {
    this.myservice.showDeleteAlert().then((result) => {
      if (result.value) {
        swal(
          'Deleted!',
          'Library has been deleted.',
          'success'
        )
        this.myservice.deleteService(PracticeServicesService.practiceApiList.deleteLibrary + data).subscribe(response => {
          if (response.status == "SUCCESS") {
            const item = this.librariesList.find(item => item.id === data);
            this.librariesList.splice(this.librariesList.indexOf(item));
            this.toastr.success("Library deleted succesfully")
          } else {
            this.toastr.error(response.errorMessage)
          }
        }
        )
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal(
          'Canceled!',
          'Your action has been cancelled',
          'error'
        )
      }
    }
    )
  }
  open(content) {
    if (this.buttonText == 'Update') {
      this.buttonText = 'Create';
    }
    if (this.buttonText == 'Create') {
      this.library = new Library();
    }
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

  saveLibrary(modal?:any){
    this.buttonText = "Create";
      this.myservice.postService(PracticeServicesService.practiceApiList.addLibrary,this.library).subscribe(response =>{
        if (response.status == 'SUCCESS') {
            this.librariesList = this.getLibraries(response.payLoad.city.id);
          if (!this.library.id) {
            this.toastr.success("Library Added succesfully")
          }else if(this.library.id){
            this.toastr.success("Library Updated succesfully")
          }
          if(modal)
          modal.close();
        } else {
          this.toastr.error(response.errorMessage)
        }
      })
  }
  updateLibrary(libraryId,modal?:any){
    this.buttonText = "Update";
    this.myservice.getService(PracticeServicesService.practiceApiList.getLibrary+libraryId).subscribe(response =>{
      if (response.status == 'SUCCESS') {
       this.library.setData(response.payLoad);
        if(modal)
        modal.close();
      } else {
        this.toastr.error(response.errorMessage)
      }
    })
  }
}
