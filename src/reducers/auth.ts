import * as auth from "actions/auth";
import * as authService from "helpers/auth";
import { IUser } from "models/user";
import { ActionType, getType } from "typesafe-actions";

export type AuthActions = ActionType<typeof auth>;

export default (state: IUser = {}, action: AuthActions) => {
    switch (action.type) {
        case getType(auth.login):
            return authService.login(action.payload.username, action.payload.password);

        case getType(auth.logout):
            return {};

        default:
            return state;
    }
};
