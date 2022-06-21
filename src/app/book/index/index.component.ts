import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  books: Book[]=[];
  form!: FormGroup;
  id!: number;

  constructor(public bookService: BookService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.bookService.getAll().subscribe((data: Book[])=>{
      this.books = data;
      console.log(this.books);
    })
    this.form = new FormGroup({
      search: new FormControl('', [Validators.required]), 
      id: new FormControl('', [Validators.required])   
    });
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
   get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.bookService.getAll().subscribe((data: Book[])=>{
      this.books = data.filter(item => ((item.title).toLowerCase()).includes(this.form.value.search.toLowerCase()));
      console.log(this.books);
    })
  }

  submitFilter()
  {
    this.id = this.form.value.id;
    console.log(this.id);
    if(this.id==1)
    {
      this.bookService.filterDateASC().subscribe((data: Book[])=>{
        this.books = data;
        console.log(this.books);
      })
    }
    if(this.id==2)
    {
      this.bookService.filterDateDESC().subscribe((data: Book[])=>{
        this.books = data;
        console.log(this.books);
      })
    }
    if(this.id==3)
    {
      this.bookService.filterGradeDESC().subscribe((data: Book[])=>{
        this.books = data;
        console.log(this.books);
      })
    }
  }

  deleteBook(id: number)
  {
    this.bookService.delete(id).subscribe(res=>{
      this.books = this.books.filter(item => item.id !== id);
      console.log('Book deleted successfully');
    })
  }
  
}
