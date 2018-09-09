import * as userA from "actions/auth";
import * as storeA from "actions/store";
import storeReducer from "reducers/store";
import authReducer from "reducers/user";
import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";

export type RootAction = userA.AuthAction | storeA.StoreAction;

export const rootReducer = combineReducers({
    auth: authReducer,
    store: storeReducer,
});

export default rootReducer;

export type RootState = StateType<typeof rootReducer>;
