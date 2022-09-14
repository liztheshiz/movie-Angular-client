import { Component } from '@angular/core';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'movie-Angular-client';

    constructor(public dialog: MatDialog) { }

    // Opens the registration dialog when the signup button is clicked  
    openUserRegistrationDialog(): void {
        this.dialog.open(UserRegistrationFormComponent, {
            // Assigning the dialog a width
            width: '280px'
        });
    }

    // Opens the login dialog when the login button is clicked
    openUserLoginDialog(): void {
        this.dialog.open(UserLoginFormComponent, {
            width: '280px'
        });
    }
}
