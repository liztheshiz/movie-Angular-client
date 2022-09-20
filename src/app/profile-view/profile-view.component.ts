import { Component, OnInit, Input } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service';

import { Router } from '@angular/router';

@Component({
    selector: 'app-profile-view',
    templateUrl: './profile-view.component.html',
    styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
    username: any = localStorage.getItem('user');
    user: any = {};
    editMode: Boolean = false;

    // Defines component's input
    @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' }

    constructor(public fetchApiData: FetchApiDataService, public router: Router) { }

    ngOnInit(): void {
        this.getUser();
    }

    getUser(): void {
        this.fetchApiData.getUser().subscribe((resp: any) => {
            this.user = resp;
            console.log(this.user);
            return this.user;
        });
    }

    toggleEditMode(): void {
        this.editMode = !this.editMode;
        this.userData = { Username: '', Password: '', Email: '', Birthday: '' }; // clear any inputted data when user cancels
    }

    handleUpdate(): void {
        console.log(this.userData);
    }

    openMovieView(): void {
        this.router.navigate(['movies']);
    }

    logout(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['welcome']);
    }
}
