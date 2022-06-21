import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book';
import { FormGroup, FormControl, Validators} from '@angular/forms';
     
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
      
  id!: number;
  book!: Book;
  form!: FormGroup;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['bookId'];
    this.bookService.find(this.id).subscribe((data: Book)=>{
      this.book = data;
    }); 
      
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('', Validators.required),
      review: new FormControl('', [Validators.required]),
      published_at: new FormControl('', Validators.required),
      grade: new FormControl('', [Validators.required])
      
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
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    console.log(this.form.value);
    this.bookService.update(this.id, this.form.value).subscribe((res:any) => {
         console.log('Book updated successfully!');
         this.router.navigateByUrl('book/index');
    })
  }
   
}