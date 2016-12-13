import { Injectable }    from '@angular/core';
import {
    CanDeactivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import { Observable }    from 'rxjs/Observable';


export interface CanComponentDeactivate {
    canBeDeactivated: (
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) => Observable<boolean> | boolean;
}


@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(
        component: CanComponentDeactivate,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ) {
        return component.canBeDeactivated ? component.canBeDeactivated(route, state) : true;
    }
}
