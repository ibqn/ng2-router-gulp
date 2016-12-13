import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

/**
 * Async modal dialog service
 * DialogService makes this app easier to test by faking this service.
 * TODO: better modal implementation that doesn't use window.confirm
 */
@Injectable()
export class DialogService {
  /**
   * Ask user to confirm an action. `message` explains the action and choices.
   * Returns promise resolving to `true`=confirm or `false`=cancel
   */
    // confirm(message?: string) {
    //     return new Promise<boolean>(resolve => {
    //         return resolve(window.confirm(message || 'Is it OK?'));
    //     });
    // };

    confirm(message?: string) {
        return new Observable<boolean>((subscriber: Subscriber<boolean>) => {
            return subscriber.next(window.confirm(message || 'Is it OK?'));
        });
    };
}