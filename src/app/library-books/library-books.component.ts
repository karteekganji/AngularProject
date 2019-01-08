import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PracticeServicesService } from '../practice-services.service';
import { ToastrService } from 'ngx-toastr';
import { LibraryComponent } from '../library/library.component';
import { library } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-library-books',
  templateUrl: './library-books.component.html',
  styleUrls: ['./library-books.component.css']
})
export class LibraryBooksComponent implements OnInit {
  libraryBooksList: any = [];
  libraryName;
  libId;
  cityId;
  constructor(private router: Router, private actRoter: ActivatedRoute,
    private myService: PracticeServicesService, private toastr: ToastrService) {
  }

  ngOnInit() {
    /* this.actRoter.queryParams.subscribe(params => {
      this.libId = params['libId'];
    }); */ // Code for fetching request params by key


    if (this.actRoter.snapshot.paramMap.get('data')) {
      let obj: any = JSON.parse(atob(this.actRoter.snapshot.paramMap.get('data'))) // For Decoding query params
      this.libId = obj.id // Another way for fetching request params by key
      this.cityId = obj.cId //when using multiple params
    }
    // this.libId = this.actRoter.snapshot.paramMap.get('id') // Another way for fetching request params by key
    // this.cityId = this.actRoter.snapshot.paramMap.get('cId') //when using multiple params



    this.getAllLibraryBooks()
  }
  getAllLibraryBooks() {

    this.myService.getService(PracticeServicesService.practiceApiList.getLibraryBooks + this.libId).subscribe(response => {
      if (response.status == 'SUCCESS') {
        this.libraryBooksList = response.payLoad.bookDetails;
        this.libraryName = response.payLoad.libraryDetails;
      } else {
        this.toastr.error(response.errorMessage)
      }
    })
  }

  goBack() {

    let obj = btoa(JSON.stringify({ cId: this.cityId }))  // For encoding Query params
    this.router.navigate(['library', { data: obj }])

    // this.router.navigate(['library',{cId:this.cityId}]); 
  }

}
