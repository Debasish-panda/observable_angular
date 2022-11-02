import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Book } from './book';

export class Testdata implements InMemoryDbService { // Testdata need to import is module that we are going to use this class data
    createDb() {
        let bookDetails: Book[] = [
            { id: 100, name: 'Angular 14', catagory: 'angular' },
            { id: 101, name: 'react', catagory: 'react book' },
            { id: 102, name: 'js', catagory: 'js book' },
            { id: 103, name: 'node', catagory: 'node book' },
            { id: 106, name: 'Angular 13', catagory: 'angular' },
            { id: 107, name: 'Angular 12', catagory: 'angular' },
            { id: 108, name: 'Angular 11', catagory: 'angular' },
            { id: 109, name: 'Angular 10', catagory: 'angular' },
        ];
        return { book: bookDetails }; //book is a small name for bookDetails we can use it further insted of bookDetails
    }
}
