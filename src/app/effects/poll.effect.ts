import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, catchError} from 'rxjs/operators';
import * as pollAction from '../actions/poll.action';
import { PollService } from '../services/poll.service';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { AlertService } from '../services/alert.service';


@Injectable()
export class PollEffects {
    constructor(
        private actions$: Actions,
        private pollService: PollService,
        private alertService: AlertService,
    ) {}

    @Effect()
    createPoll$: Observable<Action> = this.actions$.pipe(
        ofType<pollAction.CreatePoll>(pollAction.CREATE_POLL),
        switchMap((action) => {
            return this.pollService.createPoll(action.payload)
            .pipe(
                map(() => {
                    this.alertService.handleSuccess({message: 'Poll successfully created.'})
                    return new pollAction.CreatePollCompleted()
                }),
                catchError(error => {
                    this.alertService.handleError(error); 
                    return of(new pollAction.CreatePollCompleted());
                })
            );

        })
    );

    @Effect()
    updatePoll$: Observable<Action> = this.actions$.pipe(
        ofType<pollAction.UpdatePoll>(pollAction.UPDATE_POLL),
        switchMap((action) => {
            return this.pollService.updatePoll(action.payload)
            .pipe(
                map(() => {
                    this.alertService.handleSuccess({message: 'Poll successfully updated.'})
                    return new pollAction.UpdatePollCompleted()
                }),
                catchError(error => {
                    this.alertService.handleError(error); 
                    return of(new pollAction.UpdatePollCompleted());
                })
            );
        })
    );

    @Effect()
    deletePoll$: Observable<Action> = this.actions$.pipe(
        ofType<pollAction.DeletePoll>(pollAction.DELETE_POLL),
        switchMap((action) => {
            return this.pollService.deletePoll(action.payload)
            .pipe(
                map(() => {
                    this.alertService.handleSuccess({message: 'Poll successfully deleted.'})
                    return new pollAction.DeletePollCompleted()
                }),
                catchError(error => {
                    this.alertService.handleError(error); 
                    return of(new pollAction.DeletePollCompleted());
                })
            );
        })
    );
}