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
declare var swal: any;

class Library {
  constructor(
    public name: string = '',
    public address: string = '',
    public isActive: boolean = true,
    public cityId: number,
  ) { }
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

  libraryData() {
    this.formdata = new FormGroup({
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      isActive: new FormControl(
        true, [Validators.required]
      ),
      cityId: new FormControl('', [Validators.required]),
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
