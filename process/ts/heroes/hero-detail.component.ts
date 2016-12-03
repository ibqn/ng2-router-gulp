import { Component, OnInit }                 from '@angular/core';
import { Router, ActivatedRoute, Params }    from '@angular/router';

import { HeroService } from './hero.service';
import { Hero } from './hero.model';

import 'rxjs/add/operator/switchMap';


@Component({
    selector: 'my-hero-detail',
    templateUrl: 'hero-detail.component.html',
    styleUrls: ['hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    hero: Hero;

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.route.params.switchMap((params: Params) => {
            // convert string to a number
            let id: number = +params['id'];
            return this.heroService.getHero(id);
        }).subscribe(
            hero => this.hero = hero
        );
    }

    gotoHeroes() {
        this.router.navigate(['/heroes']);
    }
}