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

import { CrisisService } from './crisis.service';
import { Crisis } from './crisis.model';

import 'rxjs/add/operator/switchMap';


@Component({
    selector: 'crisis-detail',
    templateUrl: 'crisis-detail.component.html',
    styleUrls: ['crisis-detail.component.css'],
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
export class CrisisDetailComponent implements OnInit {
    crisis: Crisis;

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
        private service: CrisisService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.route.params.switchMap((params: Params) => {
            // convert string to a number
            let id: number = +params['id'];
            return this.service.getCrisis(id);
        }).subscribe(
            crisis => this.crisis = crisis
        );
    }

    gotoCrisises() {
        let crisisId = this.crisis ? this.crisis.id : null;
        this.router.navigate(['../', { id: crisisId, panic: 'yes' }], { relativeTo: this.route });
    }
}