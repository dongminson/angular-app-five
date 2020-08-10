import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, catchError} from 'rxjs/operators';
import * as authAction from '../actions/auth.action';
import { AuthService } from '../services/auth.service';
import { PollService } from '../services/poll.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { AlertService } from '../services/alert.service';


@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private pollService: PollService,
        private alertService: AlertService,
    ) {}

    @Effect()
    login$: Observable<Action> = this.actions$.pipe(
        ofType<authAction.Login>(authAction.LOGIN),
        switchMap((action) => {
            return this.authService.login(action.payload)
            .pipe(
                map((auth) => {
                    this.authService.authRedirection('/polls');
                    this.alertService.handleSuccess({message: 'Successfully logged in.'})
                    return new authAction.LoginCompleted(auth.user.uid)
                }),
                catchError(error => {
                    this.alertService.handleError(error); 
                    return of(new authAction.LoginCompleted(null));
                })
            );
        })
    );

    @Effect()
    logout$: Observable<Action> = this.actions$.pipe(
        ofType<authAction.Logout>(authAction.LOGOUT),
        switchMap(() => {
            return this.authService.logout()
            .pipe(
                map(() => {
                    this.authService.authRedirection('/login');
                    this.pollService.cancelSubscriptions();
                    this.alertService.handleSuccess({message: 'Successfully logged out.'})
                    return new authAction.LogoutCompleted()
                }),
                catchError(error => {
                    this.alertService.handleError(error); 
                    return of(new authAction.LogoutCompleted());
                })
            );
        })
    );

    @Effect()
    register$: Observable<Action> = this.actions$.pipe(
        ofType<authAction.Register>(authAction.REGISTER),
        switchMap((action) => {
            return this.authService.registerUser(action.payload)
            .pipe(
                map((auth) => {
                    this.authService.authRedirection('/polls');
                    this.alertService.handleSuccess({message: 'Successfully registered.'})
                    return new authAction.RegisterCompleted(auth.user.uid);
                }),
                catchError(error => {
                    this.alertService.handleError(error); 
                    return of(new authAction.RegisterCompleted(null));
                })
            );
        })
    );
}