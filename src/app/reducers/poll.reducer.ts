import { Poll } from '../models/poll.model';
import { PollActions, SET_POLLS, START_LOADING, CREATE_POLL, CREATE_POLL_COMPLETED, UPDATE_POLL, UPDATE_POLL_COMPLETED, DELETE_POLL, DELETE_POLL_COMPLETED } from '../actions/poll.action';

export interface State {
    loading: boolean;
    polls: Poll[];

}

const initialState: State = {
    loading: true,
    polls: [],

}

export function pollReducer(state = initialState, action: PollActions) {
    switch(action.type) {
        case START_LOADING:
            return {
                ...state,
                loading: true
            };
        case CREATE_POLL:
        case CREATE_POLL_COMPLETED:
        case UPDATE_POLL:
        case UPDATE_POLL_COMPLETED:
        case DELETE_POLL: 
        case DELETE_POLL_COMPLETED: 
            return {
                ...state
            }
        case SET_POLLS:
            return {
                ...state,
                polls: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export const getPolls = (state: State) => state.polls;
export const getLoading = (state: State) => state.loading;