import { Component } from '@angular/core';
import { map, Observable, mergeMap, filter, scan } from 'rxjs';
import { Book } from './book';
import { BookService } from './book.service';
import 'rxjs-compat/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'observable';
  myBooks: Book[]; // this is used to hold the return data from book.service.ts file of getBook() method
  myBooks$: Observable<Book[]>; //$ symbol used to know here is observable type data, object created to show async pipe example
  myBook: Book;
  myBook$: Observable<Book>;
  bookname: string;
  bookname$: Observable<string>;
  relatebooks: Book[];


  constructor(private _bookService: BookService) { }

  ngOnInit() {
    this.getallbooks();
    this.getBook();
    this.getrelatedBooks();
    this.observablepipefilter();
    this.observablepipemap();
    this.observablepipefiltermap();
    this.observablepipefiltermapscan();
  }

  getallbooks() {
    //debugger;
    this._bookService.getBook().subscribe(obj => {    //we can use curlybracket after => if we use debugger //in subscribe there is a local variable obj whose scope is with in subscribe not outside of subscribe, so we have assigned to mybooks to use in outside.
      //debugger;
      this.myBooks = obj; //1st observable set then it will give response, use smae like 2 and use debugger for clearification
    }
    );

    this.myBooks$ = this._bookService.getBook(); // this is async pipe fetch data, insted of use subscribe we can use async pipe
  }
  getBook() {
    this._bookService.getbookbyId(101).subscribe(res => {
      this.myBook = res[0];
    })
    this.myBook$ = this._bookService.getbookbyId(102);
    //  this._bookService.getbookbyId(102).map(obj=>obj[0].name).subscribe(res=>{ //before angular 14 this syntax work but now it is not working, now will receive error map is not a function
    //    this.bookname=res; 
    //  })


    this._bookService.getbookbyId(102).pipe(map(obj => obj[0].name)).subscribe(res => {
      this.bookname = res;
    })

    this.bookname$ = this._bookService.getbookbyId(101).pipe(map(obj => obj[0].name));


  }

  getrelatedBooks() { //example of mergeMap 2 times subscribe used, here mergeMap not used
    // let catagory:string;
    // //debugger;
    // this._bookService.getbookbyId(100).pipe(map(obj=>obj[0].catagory)).subscribe(res=>{
    //   catagory=res;
    //   this._bookService.getbookbyCatagory(catagory).subscribe(res=>{
    //     debugger;
    //     this.relatebooks=res;
    //   })
    // })
    //below code we used mergeMap where we have subscribed at once.
    this._bookService.getbookbyId(100).pipe(mergeMap(obj => {
      let catagory = obj[0].catagory;
      return this._bookService.getbookbyCatagory(catagory);
    })).subscribe(res => {
      this.relatebooks = res;
    })
  }


  //observable pipe filter
  observablepipefilter() {
    this._bookService.getnumbers().pipe(
      filter(n => n % 2 == 0)).subscribe(res => {
        console.log("filtered value is : " + res);
      })
  }

  //observable pipe map
  observablepipemap(){
    this._bookService.getnumbers().pipe(
      map(n=>n+10)).subscribe(res=>{
        console.log("map value for n is : "+ res);
      })
    
  }

  //observable pipe filter and map
  observablepipefiltermap(){
    this._bookService.getnumbers().pipe(filter(n=>n%2==0),map(n=>n+10)).subscribe(res=>{ //here 1st filter used and filters value is used in map so we are getting this filter and maped ans
      console.log("the result of both map and filter is : "+res);
    })
  }

  //observable pipe filter and map and scan
  observablepipefiltermapscan(){
    this._bookService.getnumbers().pipe(filter(n=>n%2==0),map(n=>n+10),scan((sum,n) => sum+n)).subscribe(res=>{ //here 1st filter used and filters value is used in map and map value used in scan so we are getting this filter and maped ans
      console.log("the result of both map and filter and scan is : "+res);
    })
  }


}
