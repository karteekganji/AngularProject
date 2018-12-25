import { FormGroup, FormControl } from '@angular/forms';
import { PracticeServicesService } from './../practice-services.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(private router: Router, private actRoter: ActivatedRoute, private myService: PracticeServicesService) {
   
  }
  ngOnInit() {
    
    this.actRoter.queryParams.subscribe(params => {
      this.libId = params['libId'];
    });
    this.data();
    this.getAllLibraryBooks();
  }

  data() {
    this.formData = new FormGroup({
      bookId: new FormControl(""),
      copies: new FormControl(""),
    });
  }
  getAllLibraryBooks() {
    this.myService.getService(PracticeServicesService.practiceApiList.getLibraryBooks + this.libId).subscribe(responce => {
      this.libraryBooksList = responce.payLoad.bookDetails;
      this.libraryName = responce.payLoad.libraryDetails;
    })
  }
  goBack(){
    this.router.navigateByUrl("library");
  }
  displayAddedBooks(event){

  }
}
