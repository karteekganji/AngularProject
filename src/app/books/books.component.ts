import { PracticeServicesService } from './../practice-services.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private router: Router, private actRoter: ActivatedRoute,
    private myService: PracticeServicesService, private toastr: ToastrService) {

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
  goBack() {
    this.router.navigateByUrl("library");
  }
  
}
