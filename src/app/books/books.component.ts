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
  constructor(private router: Router, private actRoter: ActivatedRoute,
    private myService: PracticeServicesService,private modalService: NgbModal, private toastr: ToastrService) {

  }
  ngOnInit() {
    this.getAllBooks()
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

  open(content, text) {
    this.buttonText = text;
    if (this.buttonText == 'Create') {
      this.book = new Book();
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.myService.getDismissReason(reason)}`;
    });
  }

}
