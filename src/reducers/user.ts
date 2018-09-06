import * as authActions from "actions/auth";
import * as userActions from "actions/user";
import * as authService from "helpers/auth";
import { IUser } from "models/user";
import { ActionType, getType } from "typesafe-actions";

export type UserActions = ActionType<typeof authActions & typeof userActions>;

export default (state: IUser = {}, action: UserActions): IUser => {
    switch (action.type) {
        case getType(authActions.login):
            return authService.login(action.payload.username, action.payload.password);

        case getType(authActions.logout):
            return {};

        case getType(userActions.subtractFromBalance):
            return { ...state, balance: (state.balance! - action.payload.delta) };

        default:
            return state;
    }
};
