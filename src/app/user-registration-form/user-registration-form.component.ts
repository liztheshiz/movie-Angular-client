import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
// Displays notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// Tells Angular that class below is a component
@Component({
    selector: 'app-user-registration-form', // defines selector of this class (<app-user-registration-form>)
    templateUrl: './user-registration-form.component.html',
    styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

    // Defines component's input
    @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' }

    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
        public snackBar: MatSnackBar) { }

    // Called when inputs recieve their data (from user)
    ngOnInit(): void {
    }

    // Passes userData object into API
    registerUser(): void {
        this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
            // Logic for a successful user registration goes here! (To be implemented)
            this.dialogRef.close(); // This will close the modal on success!
            console.log(result);
            this.snackBar.open(result, 'OK', {
                duration: 2000
            });
        }, (result) => {
            console.log(result);
            this.snackBar.open(result, 'OK', {
                duration: 2000
            });
        });
    }
}
