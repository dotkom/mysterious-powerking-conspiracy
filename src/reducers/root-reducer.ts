import { combineReducers, Action } from 'redux';
import { ActionType } from 'typesafe-actions';

import { User } from '../models/user';
import * as auth from '../actions/auth';
import authReducer from './auth';

export type RootState = {
    readonly auth: User;
}

export type RootActions = ActionType<typeof auth>;

export default combineReducers<RootState, RootActions>({
    auth: authReducer,
});