import { Matricula } from '../models/Matricula';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MatriculaService {

    // Node/Express API
    REST_API: string = 'http://localhost:3000/api/v1';

    // Http Header
    httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private httpClient: HttpClient) { }

    async retornaMatriculas(): Promise<any> {
        const res = await this.httpClient.get(`${this.REST_API}/register`).toPromise();
        console.log(res)
        return res;
    }

    atualizaMatriculas(id: string, data: any): Observable<any> {
        let API_URL = `${this.REST_API}/register/${id}`;
        return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
            .pipe(
                catchError(this.handleError)
            )
    }

    adicionaMatricula(data: Matricula): Observable<any> {

        return this.httpClient.post(`${this.REST_API}/register`, data)
            .pipe(
                catchError(this.handleError)
            )
    }

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

    deletaMatricula(id: string): Observable<any> {
        let API_URL = `${this.REST_API}/register/${id}`;
        return this.httpClient.delete(API_URL, { headers: this.httpHeaders }).pipe(
            catchError(this.handleError)
        )
    }
}