import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
// Displays notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-login-form',
    templateUrl: './user-login-form.component.html',
    styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

    // Defines component's input
    @Input() userData = { Username: '', Password: '' }

    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserLoginFormComponent>,
        public snackBar: MatSnackBar,
        public router: Router) { }

    // Called when inputs receive their data (from user)
    ngOnInit(): void {
    }

    /**
     * Posts userData object into API using fetch-api-data.
     * */
    loginUser(): void {
        this.fetchApiData.userLogin(this.userData).subscribe((result) => {
            // Logic for a successful user login goes here! (To be implemented)
            localStorage.setItem('user', result.user.Username);
            localStorage.setItem('token', result.token);
            this.dialogRef.close(); // This will close the modal on success!
            console.log(result);
            this.router.navigate(['movies']);
        }, (result) => {
            console.log(result);
            this.snackBar.open('You are now logged in', 'OK', {
                duration: 2000
            });
        });
    }
}
