import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: Book[]=[];

  constructor(public bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.filterGradeDESC().subscribe((data: Book[])=>{
      this.books = data;
      console.log(this.books);
    })
  }

}
