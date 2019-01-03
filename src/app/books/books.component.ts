import { FormGroup, FormControl } from '@angular/forms';
import { PracticeServicesService } from './../practice-services.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: any = [];
  libId: number;
  libraryName: string;
  libraryBooksList: any = [];
  formData;
  showBooks: boolean = true;
  booksList: any = [];
  constructor(private router: Router, private actRoter: ActivatedRoute,
    private myService: PracticeServicesService, private toastr: ToastrService) {

  }
  ngOnInit() {
    this.actRoter.queryParams.subscribe(params => {
      this.libId = params['libId'];
    });
  }

  data() {
    this.formData = new FormGroup({
      bookId: new FormControl(""),
      copies: new FormControl(""),
    });
  }
  getAllLibraryBooks() {
    this.showBooks=false;
    this.myService.getService(PracticeServicesService.practiceApiList.getLibraryBooks + this.libId).subscribe(response => {
      if (response.status == 'SUCCESS') {
        this.libraryBooksList = response.payLoad.bookDetails;
        this.libraryName = response.payLoad.libraryDetails;
      } else {
        this.toastr.error(response.errorMessage)
      }
    })
  }
  getAllBooks() {
    this.myService.getService(PracticeServicesService.practiceApiList.getAllBooks).subscribe(response => {
      if (response.status == 'SUCCESS') {
        this.booksList = response.payLoad;
      }
      else {
        this.toastr.error(response.errorMessage)
      }
    })
  }
  goBack() {
    this.router.navigateByUrl("library");
  }
  displayAddedBooks(event) {

  }
}
