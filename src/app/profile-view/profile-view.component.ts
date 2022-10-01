import { Component, OnInit, Input } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';

import { Router } from '@angular/router';

@Component({
    selector: 'app-profile-view',
    templateUrl: './profile-view.component.html',
    styleUrls: ['./profile-view.component.scss']
})
/**
 * This component comprises the page generated when the user clicks on their username in the navbar, 
 * where they can change their details and view/edit their favorites list.
 */
export class ProfileViewComponent implements OnInit {
    user: any = {};
    movies: any[] = [];
    favMovies: any[] = [];
    birthday: any = '';
    editMode: Boolean = false;

    // Defines component's input
    @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' }

    constructor(public fetchApiData: FetchApiDataService, public snackBar: MatSnackBar, public router: Router) { }

    ngOnInit(): void {
        this.getUser();
        this.getMovies();
        this.getFavorites();
    }

    /** 
     * Fetches user object from username saved in localStorage using fetch-api-data, and sets local 'user' variable to the resulting object.
     * Also calls getDate() on user.Birthday (see getDate()).
     * Returns 'user' variable.
     */
    getUser(): void {
        this.fetchApiData.getUser().subscribe((resp: any) => {
            this.user = resp;
            console.log('fetched user:');
            console.log(this.user);
            this.getDate(this.user.Birthday);
            return this.user;
        });
    }

    /** 
     * Fetches movies using fetch-api-data and sets local 'movies' variable to resulting array of movies objects.
     * Returns 'movies' variable.
    */
    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            this.movies = resp;
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
     * Takes a date string and converts it to a string with format 'mm-dd-yyyy'. 
     * Sets local 'birthday' variable to this new string.
     * @param string - date object string
     */
    getDate(string: Date) {
        var date = new Date(string);
        var newDate = date.toLocaleDateString('en-us', { timeZone: 'UTC', month: '2-digit', day: '2-digit', year: 'numeric' });
        this.birthday = newDate;
    }

    /**
     * Toggles edit mode on and off by toggling local 'editMode variable'. 
     * Also clears local 'userData' variable so previously inputted data is cleared when editing is cancelled.
     */
    toggleEditMode(): void {
        this.editMode = !this.editMode;
        this.userData = { Username: '', Password: '', Email: '', Birthday: '' }; // clear any inputted data when user cancels
    }

    /**
     * Posts new user details entered by the user to their user entry in the database. 
     * Converts Angular's birthday form string to a format acceptable by the API ('mm/dd/yy') 
     * and then posts using fetch-api-data. Saves new username in localStorage. 
     * ngOnInit() is called and editMode set to false to effectively reload the page on update.
     */
    handleUpdate(): void {
        console.log('userData:')
        console.log(this.userData);
        var newUser = this.userData;
        var birthday = `${this.userData.Birthday.charAt(5)}${this.userData.Birthday.charAt(6)}/${this.userData.Birthday.charAt(8)}${this.userData.Birthday.charAt(9)}/${this.userData.Birthday.charAt(2)}${this.userData.Birthday.charAt(3)}`;
        if (birthday != '//') {
            newUser.Birthday = birthday;
        }
        console.log('newUser:')
        console.log(newUser);
        this.fetchApiData.editUser(this.user.Username, this.userData).subscribe((result) => {
            console.log('result of request:');
            console.log(result);
            this.snackBar.open('Successfully updated profile!', 'OK', {
                duration: 2000
            });
            localStorage.setItem('user', result.Username);
            this.ngOnInit();
            this.toggleEditMode();
        });
    }

    /**
     * Removes given movie from current user's favorites, as determined by username in localStorage. 
     * Uses fetch-api-data to delete.
     * @param movieId - string type movieID from database entry
     */
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
