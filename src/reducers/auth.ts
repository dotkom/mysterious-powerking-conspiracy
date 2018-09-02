import { ActionType, getType } from 'typesafe-actions';

import * as auth from './../actions/auth';

import { User } from '../models/user';

import * as authService from '../helpers/auth';

export type AuthActions = ActionType<typeof auth>;

export default (state: User = {}, action: AuthActions) => {
    switch (action.type) {
        case getType(auth.login):
            return authService.login(action.payload.username, action.payload.password);

        case getType(auth.logout):
            return {};
        
        default:
            return state;
    }
}