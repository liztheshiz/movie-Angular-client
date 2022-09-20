import { Component, OnInit } from '@angular/core';

import { Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-director-view',
    templateUrl: './director-view.component.html',
    styleUrls: ['./director-view.component.scss']
})
export class DirectorViewComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: { Director: { Name: String, Bio: String, Birth: Date, Death: Date } }) { }

    ngOnInit(): void {
    }

    // Converts complex date string into simple four-digit year string
    getYear(string: Date) {
        let date = new Date(string);
        return date.getFullYear();
    }
}
