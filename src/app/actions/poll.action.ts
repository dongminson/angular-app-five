import { Action } from '@ngrx/store';
import { Poll } from '../models/poll.model';

export const START_LOADING = '[Poll] Start Loading';
export const SET_POLLS = '[Poll] Set Polls';
export const CREATE_POLL = '[Poll] Create Poll';
export const CREATE_POLL_COMPLETED = '[Poll] Create Poll Completed';
export const CREATE_POLL_ERROR = '[Poll] Create Poll Error';
export const UPDATE_POLL = '[Poll] Update Poll';
export const UPDATE_POLL_COMPLETED = '[Poll] Update Poll Completed';
export const DELETE_POLL = '[Poll] Delete Poll';
export const DELETE_POLL_COMPLETED = '[Poll] Delete Poll Completed';

export class StartLoading implements Action {
  readonly type = START_LOADING;
}

export class UpdatePoll implements Action {
  readonly type = UPDATE_POLL;
  constructor(public payload: Poll) {}
}

export class UpdatePollCompleted implements Action {
  readonly type = UPDATE_POLL_COMPLETED;
}

export class DeletePoll implements Action {
  readonly type = DELETE_POLL;
  constructor(public payload: string) {}
}

export class DeletePollCompleted implements Action {
  readonly type = DELETE_POLL_COMPLETED;
}

export class CreatePoll implements Action {
  readonly type = CREATE_POLL;
  constructor(public payload: Poll) {}
}

export class CreatePollCompleted implements Action {
  readonly type = CREATE_POLL_COMPLETED;
}

export class SetPolls implements Action {
  readonly type = SET_POLLS;
  constructor(public payload: Poll[]) {}
}

export type PollActions = StartLoading | SetPolls | CreatePoll | CreatePollCompleted | UpdatePoll | UpdatePollCompleted | DeletePoll | DeletePollCompleted;