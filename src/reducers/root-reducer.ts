import * as auth from "actions/auth";
import { IStore } from "models/store";
import { IUser } from "models/user";
import authReducer from "reducers/auth";
import storeReducer from "reducers/store";
import { combineReducers } from "redux";
import { ActionType } from "typesafe-actions";

export interface IRootState {
    readonly auth: IUser;
    readonly store: IStore;
}

export type RootActions = ActionType<typeof auth>;

export default combineReducers<IRootState, RootActions>({
    auth: authReducer,
    store: storeReducer,
});
