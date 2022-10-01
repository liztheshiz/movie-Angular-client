import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';
import { MatDialog } from '@angular/material/dialog';

import { Router } from '@angular/router';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
    movies: any[] = [];
    favMovies: any[] = [];
    user: any = localStorage.getItem('user');
    constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog, public router: Router) { }

    // Called when Angular is done creating component
    ngOnInit(): void {
        this.getMovies();
        this.getFavorites();
    }

    /** 
     * Fetches movies using fetch-api-data and sets local 'movies' variable to resulting array of movies objects.
     * Returns 'movies' variable.
    */
    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            this.movies = resp;
            console.log(this.movies);
            return this.movies;
        });
    }

    /**
     * Fetches user object by username in localStorage using fetch-api-data, and sets local 'favMovies' variable to result's 'FavoriteMovies' propery.
     * Returns 'favMovies' variable.
     */
    getFavorites(): void {
        this.fetchApiData.getUser().subscribe((resp: any) => {
            this.favMovies = resp.FavoriteMovies;
            return this.favMovies;
        });
    }

    /**
     * Adds given movie to current user's favorites, as determined by username in localStorage. 
     * Uses fetch-api-data to post.
     * @param movieId - string type movieID from database entry
     */
    addToFavorites(movieId: String): void {
        console.log(`adding ${movieId}`);
        this.fetchApiData.addToFavorites(movieId).subscribe((resp: any) => {
            this.ngOnInit();
        });
    }

    /**
     * Removes given movie from current user's favorites, as determined by username in localStorage. 
     * Uses fetch-api-data to delete.
     * @param movieId - string type movieId from database entry
     */
    removeFromFavorites(movieId: String): void {
        console.log(`deleting ${movieId}`);
        this.fetchApiData.deleteFromFavorites(movieId).subscribe((resp: any) => {
            this.ngOnInit();
        });
    }

    /**
     * Tests whether or not a given movie is included in current list of favorites, stored in local variable 'favMovies'.
     * @param id - string type movieId from database entry
     * @returns Boolean representing whether movie is in list of favorites
     */
    isFavorite(id: Number): Boolean {
        return this.favMovies.includes(id);
    }

    openDirectorView(director: Object): void {
        this.dialog.open(DirectorViewComponent, {
            data: {
                Director: director
            },
            width: '280px'
        });
    }

    openGenreView(genre: Object): void {
        this.dialog.open(GenreViewComponent, {
            data: {
                Genre: genre
            },
            width: '280px'
        });
    }

    openSynopsisView(movie: Object): void {
        this.dialog.open(SynopsisViewComponent, {
            data: {
                Movie: movie
            },
            width: '280px'
        });
    }

    openMovieView(): void {
        this.router.navigate(['movies']);
    }

    openProfileView(): void {
        this.router.navigate(['profile']);
    }

    logout(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['welcome']);
    }
}
