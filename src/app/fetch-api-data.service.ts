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
export class FetchApiDataService {

    //export class UserRegistrationService {
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

    // Logs existing user in
    public userLogin(userDetails: any): Observable<any> {
        console.log(userDetails);
        return this.http.post(apiUrl + 'users', userDetails).pipe(
            catchError(this.handleError)
        );
    }

    // Gets a list of all movies from database
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

    // Gets a single movie's details from database, by title
    public getMovie(movieTitle: String): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies/' + movieTitle, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            catchError(this.handleError)
        );
    }

    // Gets a director's details from database, by name
    public getDirector(directorName: String): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies/directors/' + directorName, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            catchError(this.handleError)
        );
    }

    // Gets a genre's details from database, by name
    public getGenre(genreName: String): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies/genres/' + genreName, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            catchError(this.handleError)
        );
    }

    // Gets a user's details from database, by name
    public getUser(username: String): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'users/' + username, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            catchError(this.handleError)
        );
    }

    // Add movie to user's favorites list, by movieID
    public addToFavorites(username: String, movieId: Number): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.post(apiUrl + 'users/' + username + '/FavoriteMovies/' + movieId, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            catchError(this.handleError)
        );
    }

    // Edits a user's details
    public editUser(username: String, userDetails: any): Observable<any> {
        console.log(userDetails);
        const token = localStorage.getItem('token');
        return this.http.put(apiUrl + 'users/' + username, userDetails, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            catchError(this.handleError)
        );
    }

    // Deletes a user from database, by name
    public deleteUser(username: String): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.delete(apiUrl + 'users/' + username, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
            catchError(this.handleError)
        );
    }

    // Deletes a movie from user's list of favorites
    public deleteFromFavorites(username: String, movieId: Number): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.delete(apiUrl + 'users/' + username + '/FavoriteMovies/' + movieId, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token,
                })
        }).pipe(
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