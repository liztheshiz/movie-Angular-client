import { Component, OnInit } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service';

import { Router } from '@angular/router';

@Component({
    selector: 'app-profile-view',
    templateUrl: './profile-view.component.html',
    styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
    user: any = localStorage.getItem('user');
    constructor(public fetchApiData: FetchApiDataService, public router: Router) { }

    ngOnInit(): void {
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
