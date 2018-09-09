import * as authA from "actions/auth";
import * as userA from "actions/user";
import * as authService from "helpers/auth";
import { IUser } from "models/user";
import { ActionType, getType, StateType } from "typesafe-actions";

export type UserActions = ActionType<typeof authA & typeof userA>;

export const userReducer = (state: IUser = {}, action: UserActions): IUser => {
    switch (action.type) {
        case getType(authA.login):
            return authService.login(action.payload.username, action.payload.password);

        case getType(authA.logout):
            return {};

        case getType(userA.subtractFromBalance):
            return { ...state, balance: (state.balance! - action.payload.delta) };

        default:
            return state;
    }
};

export type UserState = StateType<typeof userReducer>;

export default userReducer;
