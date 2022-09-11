import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://cinemadatabase.herokuapp.com/';

@Injectable({
    providedIn: 'root'
})

// This line was here originally...?
//export class FetchApiDataService {

export class UserRegistrationService {
    // Injects the HttpClient module to the constructor params
    // This provides HttpClient to the entire class, making it available via this.http
    constructor(private http: HttpClient) {
    }

    // Extracts response data from HTTP response
    private extractResponseData(res: Object): any { // changed type Response to Object
        const body = res;
        return body || {};
    }

    // Posts new user data to the database
    public userRegistration(userDetails: any): Observable<any> {
        console.log(userDetails);
        return this.http.post(apiUrl + 'users', userDetails).pipe(
            catchError(this.handleError)
        );
    }

    // Gets a list of all movies
    public getAllMovies(): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies', {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    // Error handling
    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error('Some error occurred:', error.error.message);
        } else {
            console.error(
                `Error Status code ${error.status}, ` +
                `Error body is: ${error.error}`);
        }
        return throwError(() => new Error(
            'Something bad happened; please try again later.'));
    }
}