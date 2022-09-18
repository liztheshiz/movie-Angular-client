import { Component, OnInit } from '@angular/core';

import { Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-genre-view',
    templateUrl: './genre-view.component.html',
    styleUrls: ['./genre-view.component.scss']
})
export class GenreViewComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: { Genre: { Name: String, Description: String } }) { }

    ngOnInit(): void {
    }

}
