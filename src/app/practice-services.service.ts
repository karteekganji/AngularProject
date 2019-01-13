import { Constants } from './constants';
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2/dist/sweetalert2.js'
declare var swal: any;
@Injectable()
export class PracticeServicesService {
  httpdata;
  baseUrl = Constants.Base_URL;
  
  constructor(private http: HttpClient, private toastr: ToastrService, private modalService: NgbModal) {
  }
  ngOnInit() {

  }
  public static practiceApiList = {
    getCities: "get-cities",
    getAllBooks: "get-all-books",
    getBook:"get-book/",
    getBooksData: "admin/books-data",
    addBook:"admin/add-book",
    login: "login",
    getLibraries: "get-all-library?cityId=",
    deleteLibrary: "admin/delete-library/",
    getLibrary:"get-library/",
    addLibrary:"admin/add-library",
    getLibraryBooks: "library-books/",
    signUp: "signup",
    logOut: "logout",
    forgotPassword:"forgot-password?emailId=",
    resetPassword:"reset-password"

  }

  getService(url) {
    var localStorageVariable = '';
    if (localStorage.getItem('Auth-Token')) {
      localStorageVariable = localStorage.getItem('Auth-Token');
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Auth-Token': localStorageVariable
      })
    };
    return this.http.get(this.baseUrl + url, httpOptions).pipe(map((response: any) => response));
  }
  postService(url, data) {
    var localStorageVariable = '';
    if (localStorage.getItem('Auth-Token')) {
      localStorageVariable = localStorage.getItem('Auth-Token');
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Auth-Token': localStorageVariable
      })
    };
    console.log(data)
    return this.http.post(this.baseUrl + url, data, httpOptions).pipe(map((response: any) => response));
  }
  deleteService(url) {
    var localStorageVariable = '';
    if (localStorage.getItem('Auth-Token')) {
      localStorageVariable = localStorage.getItem('Auth-Token');
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Auth-Token': localStorageVariable
      })
    };
    return this.http.delete(this.baseUrl + url, httpOptions).pipe(map((response: any) => response));
  }
  showDeleteAlert(): any {
    return swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    })
  }
  isLogin() {
    if (localStorage.getItem("Auth-Token")) {
      return true;
    } else {
      return false;
    }
  }

  handleError(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }

   getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
