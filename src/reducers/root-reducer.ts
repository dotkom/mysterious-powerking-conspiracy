import { combineReducers } from "redux";
import { ActionType } from "typesafe-actions";

import * as auth from "actions/auth";
import { IUser } from "models/user";
import authReducer from "reducers/auth";

export interface IRootState {
    readonly auth: IUser;
}

export type RootActions = ActionType<typeof auth>;

export default combineReducers<IRootState, RootActions>({
    auth: authReducer,
});
