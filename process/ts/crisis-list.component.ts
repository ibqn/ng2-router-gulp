import { Component, OnInit }  from  '@angular/core';
import { Router }             from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';


@Component({
    selector: 'crisis-list',
    templateUrl: 'crisis-list.component.html',
    styleUrls: ['crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {

    constructor(
        private router: Router
    ) {}

    ngOnInit(): void {
    }
}