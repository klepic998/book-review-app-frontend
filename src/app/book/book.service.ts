import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
     
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
  
import { Book } from './book';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  private apiURL = "http://localhost:8000/api";
    
 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
   
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(private httpClient: HttpClient) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  getAll(): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/fetchall')
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  create(book: Book): Observable<any> {
  
    return this.httpClient.post(this.apiURL + '/create', JSON.stringify(book), this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }  
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  find(id:number): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/book/' + id)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  update(id:number, book:Book): Observable<any> {
  
    return this.httpClient.put(this.apiURL + '/update/' + id, JSON.stringify(book), this.httpOptions)
 
    .pipe( 
      catchError(this.errorHandler)
    )
  }
       
  /**
   * Write code on Method
   *
   * @return response()
   */
  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/delete/' + id, this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
   filterDateASC(): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/filter/date/asc')
  
    .pipe(
      catchError(this.errorHandler)
    )
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
   filterDateDESC(): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/filter/date/desc')
  
    .pipe(
      catchError(this.errorHandler)
    )
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
   filterGradeDESC(): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/filter/grade/desc/')
  
    .pipe(
      catchError(this.errorHandler)
    )
  }


  /** 
   * Write code on Method
   *
   * @return response()
   */
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
 }
}