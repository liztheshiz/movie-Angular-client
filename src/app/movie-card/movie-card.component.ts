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

    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            this.movies = resp;
            console.log(this.movies);
            return this.movies;
        });
    }

    getFavorites(): void {
        this.fetchApiData.getUser().subscribe((resp: any) => {
            this.favMovies = resp.FavoriteMovies;
            return this.favMovies;
        });
    }

    addToFavorites(movieId: String): void {
        console.log(`adding ${movieId}`);
        this.fetchApiData.addToFavorites(movieId).subscribe((resp: any) => {
            this.ngOnInit();
        });
    }

    removeFromFavorites(movieId: String): void {
        console.log(`deleting ${movieId}`);
        this.fetchApiData.deleteFromFavorites(movieId).subscribe((resp: any) => {
            this.ngOnInit();
        });
    }

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
