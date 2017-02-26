import {
    Component,
    OnInit,
    HostBinding,
    trigger,
    transition,
    animate,
    style,
    state
} from '@angular/core';
import {
    Router,
    ActivatedRoute,
    Params
} from '@angular/router';

import { HeroService } from './hero.service';
import { Hero } from './hero.model';

import 'rxjs/add/operator/switchMap';


@Component({
    selector: 'my-hero-detail',
    templateUrl: 'hero-detail.component.html',
    styleUrls: ['hero-detail.component.css'],
    animations: [
        trigger('routeAnimation', [
            state('*',
                style({
                    opacity: 1,
                    transform: 'translateX(0)'
                })
            ),
            transition(':enter', [
                style({
                    opacity: 0,
                    transform: 'translateX(-100%)'
                }),
                animate('0.2s ease-in')
            ]),
            transition(':leave', [
                animate('0.5s ease-out',
                    style({
                        opacity: 0,
                        transform: 'translateY(100%)'
                    })
                )
            ])
        ])
    ]
})
export class HeroDetailComponent implements OnInit {
    hero: Hero;

    @HostBinding('@routeAnimation') get routeAnimation() {
        return true;
    }

    @HostBinding('style.display') get display() {
        return 'block';
    }

    @HostBinding('style.position') get position() {
        return 'absolute';
    }

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
        let heroId = this.hero ? this.hero.id : null;
        this.router.navigate(['/heroes', { id: heroId, foo: 'bar' }]);
    }
}
