import { Component, OnInit }                 from '@angular/core';
import { Router, ActivatedRoute, Params }    from '@angular/router';

import { CrisisService }  from './crisis.service';
import { Crisis }  from './crisis.model';

import { Observable } from 'rxjs/Observable';


@Component({
    templateUrl: 'crisis-list.component.html',
    styleUrls: ['crisis-list.component.css']
})
export class CrisisListComponent implements OnInit {
    crisises: Observable<Crisis[]>;
    private selectedId: number;

    constructor(
        private crisisService: CrisisService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.crisises = this.crisisService.getCrisises();
    }

    isSelected(crisis: Crisis) { return crisis.id === this.selectedId; }

    onSelect(crisis: Crisis) {
        this.router.navigate([crisis.id], { relativeTo: this.route});
    }
}