import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Curso } from '../models/Curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  // Node/Express API
  REST_API: string = 'http://localhost:3000/api/v1';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  // Add
  adicionaCurso(data: Curso): Observable<any> {

    return this.httpClient.post(`${this.REST_API}/course`, data)
      .pipe(
        catchError(this.handleError)
      )
  }


  // Get all objects
  async retornaCursos(): Promise<any> {
    const res = this.httpClient.get(`${this.REST_API}/course`).toPromise();
    return res;
  }


  // Get single object
  retornaCurso(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
        return res || {}
      }),
        catchError(this.handleError)
      )
  }


  // Update
  atualizaCurso(id: string, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/course/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }


  // Delete
  deletaCurso(id: string): Observable<any> {
    let API_URL = `${this.REST_API}/course/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    )
  }


  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }



}
