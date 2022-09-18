import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
    movies: any[] = [];
    favMovies: any[] = [];
    constructor(public fetchApiData: FetchApiDataService, public dialog: MatDialog) { }

    // Called when Angular is done creating component
    ngOnInit(): void {
        console.log('init called');
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
            console.log(`add resp: ${resp}`);
            this.ngOnInit();
        });
    }

    removeFromFavorites(movieId: String): void {
        console.log(`deleting ${movieId}`);
        this.fetchApiData.deleteFromFavorites(movieId).subscribe((resp: any) => {
            console.log(`delete resp: ${resp}`);
            //this.ngOnInit();
            location.reload();
        });
    }

    isFavorite(id: Number): Boolean {
        return this.favMovies.includes(id);
    }

    openDirectorView(): void {
        this.dialog.open(DirectorViewComponent, {
            width: '280px'
        });
    }
}
