import { Component, OnInit } from '@angular/core';

import { Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-synopsis-view',
    templateUrl: './synopsis-view.component.html',
    styleUrls: ['./synopsis-view.component.scss']
})
export class SynopsisViewComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: { Movie: { Title: String, Description: String } }) { }

    ngOnInit(): void {
    }

}
