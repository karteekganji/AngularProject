import { AppComponent } from './../app.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PracticeServicesService } from '../practice-services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2/dist/sweetalert2.js'
declare var swal: any;

class Library {
  public name: string = '';
  public address: string = '';
  public isActive: boolean = true;
  public cityId: number;
  public id: number;
  constructor(values?: any) {
    Object.assign(this, values);
  }
  /* setData(payload?: any) {
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
   } */
}

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})

export class LibraryComponent implements OnInit {
  librariesList: any = [];
  closeResult: string;
  library = new Library();
  buttonText = "";
  cityId;
  /* ##### Material UI Code
   dataSource: MatTableDataSource<any>;
   @ViewChild(MatSort) sort: MatSort;
   @ViewChild(MatPaginator) paginator: MatPaginator;
   searchKey: string;
   columnsToDisplay: string[] = ['position', 'name', 'address','actions']; */
  constructor(private appcomp: AppComponent, private myService: PracticeServicesService,
    private router: Router, private modalService: NgbModal, private toastr: ToastrService,
    private actRoter: ActivatedRoute) { }

  ngOnInit() {
    
    if (this.actRoter.snapshot.paramMap.get('data')) {
      let obj: any = JSON.parse(atob(this.actRoter.snapshot.paramMap.get('data')))
      this.cityId = obj.cId;
    }
    // this.cityId = this.actRoter.snapshot.paramMap.get('cId')
    if (this.cityId != null) {
      this.getLibraries(this.cityId)
    }
    else {
      this.cityId = null;
    }
  }

  getUserRole() {
    return this.appcomp.getUserRole();
  }
  getLibraries(event) {
    if (event.target) {
      if (event.target.value) {
        this.router.navigateByUrl("library")
        this.cityId = event.target.value;
        this.myService.getService(PracticeServicesService.practiceApiList.getLibraries + event.target.value).subscribe(response => {
          this.librariesList = response.payLoad;

          /* ##### Material UI Code
           this.dataSource = new MatTableDataSource(this.librariesList)
           this.dataSource.sort = this.sort;
           this.dataSource.paginator = this.paginator; */
        })
      }
    }
    else {
      this.cityId = event;
      this.myService.getService(PracticeServicesService.practiceApiList.getLibraries+ event).subscribe(response => {
        this.librariesList = response.payLoad;
      })
    }
  }
  onDelete(data) {
    this.myService.showDeleteAlert().then((result) => {
      if (result.value) {
        swal(
          'Deleted!',
          'Library has been deleted.',
          'success'
        )
        this.myService.deleteService(PracticeServicesService.practiceApiList.deleteLibrary + data).subscribe(response => {
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
  open(content, text) {
    this.buttonText = text;
    if (this.buttonText == 'Create') {
      this.library = new Library();
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.myService.getDismissReason(reason)}`;
    });
  }
 
  getAllLibraryBooks(libraryId) {

    let obj = btoa(JSON.stringify({ id: libraryId, cId: this.cityId }))

    this.router.navigate(['librarybooks',{ data: obj }],{relativeTo:this.actRoter}) // For encoding Query params

    // this.router.navigate(['library/librarybooks',{id:libraryId,cId:this.cityId}]) 
    //Optional routing to pass multiple optional params

    // this.router.navigate(['library/librarybooks',libraryId])
  }

  getCities() {
    return this.appcomp.citiesList;
  }

  saveLibrary(modal?: any) {
    this.myService.postService(PracticeServicesService.practiceApiList.addLibrary, this.library).subscribe(response => {
      if (response.status == 'SUCCESS') {
        this.getLibraries(response.payLoad.city.id);
        if (this.buttonText == 'Create') {
          this.toastr.success("Library Added succesfully")
        } else if (this.buttonText == 'Update') {
          this.toastr.success("Library Updated succesfully")
        }
        if (modal)
          modal.close();
      } else {
        this.toastr.error(response.errorMessage)
      }
    })
  }
  updateLibrary(libraryId, modal?: any) {
    this.myService.getService(PracticeServicesService.practiceApiList.getLibrary + libraryId).subscribe(response => {
      if (response.status == 'SUCCESS') {
        //  this.library.setData(response.payLoad);
        this.library = response.payLoad;
        this.library.cityId = response.payLoad.city.id;
        if (modal)
          modal.close();
      } else {
        this.toastr.error(response.errorMessage)
      }
    })
  }
}
