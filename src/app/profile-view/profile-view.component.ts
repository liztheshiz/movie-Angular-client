import { Component, OnInit, Input } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

import { Router } from '@angular/router';

@Component({
    selector: 'app-profile-view',
    templateUrl: './profile-view.component.html',
    styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
    user: any = {};
    movies: any[] = [];
    favMovies: any[] = [];
    editMode: Boolean = false;

    // Defines component's input
    @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' }

    constructor(public fetchApiData: FetchApiDataService, public snackBar: MatSnackBar, public router: Router) { }

    ngOnInit(): void {
        this.getUser();
        this.getMovies();
        this.getFavorites();
    }

    getUser(): void {
        this.fetchApiData.getUser().subscribe((resp: any) => {
            this.user = resp;
            console.log('fetched user:');
            console.log(this.user);
            return this.user;
        });
    }

    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            this.movies = resp;
            return this.movies;
        });
    }

    getFavorites(): void {
        this.fetchApiData.getUser().subscribe((resp: any) => {
            this.favMovies = resp.FavoriteMovies;
            console.log('fetched faves:')
            console.log(this.favMovies);
            return this.favMovies;
        });
    }

    toggleEditMode(): void {
        this.editMode = !this.editMode;
        this.userData = { Username: '', Password: '', Email: '', Birthday: '' }; // clear any inputted data when user cancels
    }

    handleUpdate(): void {
        console.log(this.userData);
        var newUser = this.userData;
        var birthday = `${this.userData.Birthday.charAt(5)}${this.userData.Birthday.charAt(6)}/${this.userData.Birthday.charAt(8)}${this.userData.Birthday.charAt(9)}/${this.userData.Birthday.charAt(2)}${this.userData.Birthday.charAt(3)}`;
        if (birthday != '//') {
            newUser.Birthday = birthday;
        }
        console.log(newUser);
        this.fetchApiData.editUser(this.user.Username, this.userData).subscribe((result) => {
            console.log(result);
            this.snackBar.open('Successfully updated profile!', 'OK', {
                duration: 2000
            });
            localStorage.setItem('user', result.Username);
            this.ngOnInit();
            this.toggleEditMode();
        });
    }

    removeFromFavorites(movieId: String): void {
        console.log(`deleting ${movieId}`);
        this.fetchApiData.deleteFromFavorites(movieId).subscribe((resp: any) => {
            this.ngOnInit();
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
