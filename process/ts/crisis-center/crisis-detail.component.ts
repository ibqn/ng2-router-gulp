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

import { DialogService}  from '../dialog.service';

import { Observable }    from 'rxjs/Observable';

import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { CanComponentDeactivate } from '../can-deactivate-guard.service';


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
export class CrisisDetailComponent implements OnInit, CanComponentDeactivate {
    crisis: Crisis;
    editName: string;

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
        private dialogService: DialogService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.route.params.switchMap((params: Params) => {
            // convert string to a number
            let id: number = +params['id'];
            return this.service.getCrisis(id);
        }).subscribe((crisis: Crisis) => {
            this.crisis = crisis;
            this.editName = crisis.name;
        });
    }

    gotoCrises() {
        let crisisId = this.crisis ? this.crisis.id : null;
        this.router.navigate(
            ['../', { id: crisisId, panic: 'yes' }],
            { relativeTo: this.route }
        );
    }

    canBeDeactivated(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean  {
        // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
        if (!this.crisis || this.crisis.name === this.editName) {
            return true;
        }
        // Otherwise ask the user with the dialog service and return its
        // promise which resolves to true or false when the user decides
        return this.dialogService.confirm('Discard changes?');
    }

    cancel() {
        this.gotoCrises();
    }

    save() {
        this.crisis.name = this.editName;
        this.gotoCrises();
    }
}
