import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
     
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  imageSrc: string = '';

  
  form!: FormGroup;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public bookService: BookService,
    private router: Router
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('', Validators.required),
      review: new FormControl('', [Validators.required]),
      published_at: new FormControl('', Validators.required),
      grade: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
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
   onFileChange(event:any) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
      
     
        this.form.patchValue({
          fileSource: reader.result as string
        });
   
      };
   
    }
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    console.log(this.form.value);
    this.bookService.create(this.form.value).subscribe((res:any) => {
         console.log('Book created successfully!');
         this.router.navigateByUrl('book/index');
    })
  }
  
}