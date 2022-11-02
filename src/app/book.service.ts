import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookService { //this service we will use in app.component.ts file



  private apiUrl = "/api/book"; //this is our api link as normal we are mentioning url this is here angular-in-memory-web-api used which is book from testdata.ts file
  //we make apiUrl private to not show in app.component.ts file in ngOnInit
  constructor(private _http: HttpClient) { }// here we need to create object of httpClient

  getBook(): Observable<Book[]> {      //we are creating a getBook method and we set it as observable and passed book type
    return this._http.get<Book[]>(this.apiUrl); //then we have returned the book data by fetching from apiurl, by get method it will access data which is in testdata.ts file
  }

  getbookbyId(bookid: number): Observable<Book> {  //this method is used to get data by id in app.component.ts file, here we used only <Book> not array cause id will return only one value
    return this._http.get<Book>(this.apiUrl + "?id=" + bookid);
  }

  //   bookDetails: Book[] = [
  //     { id: 100, name: 'Angular', catagory: 'angular book' },
  //     { id: 101, name: 'react', catagory: 'react book' },
  //     { id: 102, name: 'js', catagory: 'js book' },
  //     { id: 103, name: 'node', catagory: 'node book' }
  // ];

  // getbookbyof():Observable<Book[]>{
  //   return of(this.bookDetails);
  // }

  getbookbyCatagory(categ: string): Observable<Book[]> {
    return this._http.get<Book[]>(this.apiUrl + "?catagory=" + categ);
  }

  getnumbers(): Observable<number> {
    return of(1, 2, 3, 4, 5, 6, 7, 8, 9);
  }

}


