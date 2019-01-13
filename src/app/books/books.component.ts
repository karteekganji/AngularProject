import { PracticeServicesService } from './../practice-services.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

class Book {
  public authorId: number
  public bookId: number
  public categoryId: number
  public copies: number
  public description: String
  public isActive: boolean
  public languageId: number
  public pages: number
  public publisherId: number
  public title: String
  constructor(values?: any) {
    Object.assign(this, values);
  }
}
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent implements OnInit {
  books: any = [];
  libraryName: string;
  libraryBooksList: any = [];
  formData;
  booksList: any = [];
  book = new Book();
  buttonText = "";
  closeResult: string;
  categoryList:any = [];
  authorList:any = [];
  languageList:any = [];
  publisherList:any = [];
  constructor(private router: Router, private actRoter: ActivatedRoute,
    private myService: PracticeServicesService,private modalService: NgbModal, private toastr: ToastrService) {

  }
  ngOnInit() {
    this.getAllBooks()
    this.getBooksData()
  }

  getAllBooks() {
    this.myService.getService(PracticeServicesService.practiceApiList.getAllBooks).subscribe(response => {
      if (response.status == 'SUCCESS') {
        this.booksList = response.payLoad;
      }
      else {
        this.toastr.error(response.errorMessage)
      }
    });
  }

  getBooksData() {
    this.myService.getService(PracticeServicesService.practiceApiList.getBooksData).subscribe(response => {
      if (response.status == 'SUCCESS') {
        this.authorList = response.payLoad.authors;
        this.categoryList = response.payLoad.categories;
        this.languageList = response.payLoad.languages;
        this.publisherList = response.payLoad.publishers;
      }
      else {
        this.toastr.error(response.errorMessage)
      }
    });
  }

  open(bookModel, text) {
    this.buttonText = text;
    if (this.buttonText == 'Create') {
      this.book = new Book();
    }
    this.modalService.open(bookModel, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.myService.getDismissReason(reason)}`;
    });
  }

  saveBook(modal?: any) {
    this.myService.postService(PracticeServicesService.practiceApiList.addBook, this.book).subscribe(response => {
      if (response.status == 'SUCCESS') {
        if (this.buttonText == 'Create') {
          this.toastr.success("Book Added succesfully")
        } else if (this.buttonText == 'Update') {
          this.toastr.success("Book Updated succesfully")
        }
        if (modal)
          modal.close();
      } else {
        this.toastr.error(response.errorMessage)
      }
    })
  }
  updateBook(bookId, modal?: any) {
    this.myService.getService(PracticeServicesService.practiceApiList.getBook + bookId).subscribe(response => {
      if (response.status == 'SUCCESS') {
        //  this.library.setData(response.payLoad);
        this.book = response.payLoad;
        if (modal)
          modal.close();
      } else {
        this.toastr.error(response.errorMessage)
      }
    })
  }

}
