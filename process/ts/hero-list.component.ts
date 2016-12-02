import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';


@Component({
    selector: 'my-hero-list',
    templateUrl: 'hero-list.component.html',
    styleUrls: ['hero-list.component.css']
})
export class HeroListComponent implements OnInit {


    constructor(
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {

    }

    goBack(): void {
        this.location.back();
    }

    save(): void {
    }
}
