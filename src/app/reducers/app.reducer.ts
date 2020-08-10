import {ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPoll from './poll.reducer';
import * as fromAuth from './auth.reducer';

export interface State {
    poll: fromPoll.State;
    auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<State> = {
    poll: fromPoll.pollReducer,
    auth: fromAuth.authReducer
};

export const getPollState = createFeatureSelector<fromPoll.State>('poll');
export const selectPolls = createSelector(getPollState, fromPoll.getPolls);
export const selectLoading = createSelector(getPollState, fromPoll.getLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const selectIsAuth = createSelector(getAuthState, fromAuth.selectIsAuth);
export const selectUserId =  createSelector(getAuthState, fromAuth.selectUserId);