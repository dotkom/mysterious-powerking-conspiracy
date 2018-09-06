import * as authActions from "actions/auth";
import * as storeActions from "actions/store";
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

export type RootActions = ActionType<typeof authActions> & ActionType<typeof storeActions>;

export default combineReducers<IRootState, RootActions>({
    auth: authReducer,
    store: storeReducer,
});
