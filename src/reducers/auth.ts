import * as authActions from "actions/auth";
import * as authService from "helpers/auth";
import { IUser } from "models/user";
import { ActionType, getType } from "typesafe-actions";

export type AuthActions = ActionType<typeof authActions>;

export default (state: IUser = {}, action: AuthActions): IUser => {
    switch (action.type) {
        case getType(authActions.login):
            return authService.login(action.payload.username, action.payload.password);

        case getType(authActions.logout):
            return {};

        default:
            return state;
    }
};
