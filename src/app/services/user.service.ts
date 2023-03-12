import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    // Node/Express API
    REST_API: string = 'http://localhost:3000/api/v1';

    // Http Header
    httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private httpClient: HttpClient) { }

    async getUsers(): Promise<any> {
        const res = await this.httpClient.get(`${this.REST_API}/user`).toPromise();
        console.log(res)
        return res;
    }

    updateUsers(id: string, data: any): Observable<any> {
        let API_URL = `${this.REST_API}/user/${id}`;
        return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
            .pipe(
                catchError(this.handleError)
            )
    }

    addUser(data: User): Observable<any> {

        return this.httpClient.post(`${this.REST_API}/user`, data)
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

    deleteUser(id: string): Observable<any> {
        let API_URL = `${this.REST_API}/user/${id}`;
        return this.httpClient.delete(API_URL, { headers: this.httpHeaders }).pipe(
            catchError(this.handleError)
        )
    }
}