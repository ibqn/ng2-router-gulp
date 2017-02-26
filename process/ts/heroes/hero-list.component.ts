import { Component, OnInit }                 from '@angular/core';
import { Router, ActivatedRoute, Params }    from '@angular/router';

import { HeroService }  from './hero.service';
import { Hero }  from './hero.model';

import { Observable } from 'rxjs/Observable';


@Component({
    templateUrl: 'hero-list.component.html',
    styleUrls: ['hero-list.component.css']
})
export class HeroListComponent implements OnInit {
    heroes: Observable<Hero[]>;
    private selectedId: number;

    constructor(
        private service: HeroService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.heroes = this.route.params
        .switchMap((params: Params) => {
            this.selectedId = +params['id'];
            return this.service.getHeroes();
        });
    }

    isSelected(hero: Hero) { return hero.id === this.selectedId; }

    onSelect(hero: Hero) {
        this.router.navigate(['/hero', hero.id]);
    }
}
