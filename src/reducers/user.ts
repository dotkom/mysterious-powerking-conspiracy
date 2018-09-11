import * as authA from "actions/auth";
import * as userA from "actions/user";
import * as authService from "helpers/auth";
import { AppToaster } from "helpers/toaster";
import { IUser } from "models/user";
import { ActionType, getType, StateType } from "typesafe-actions";

export type UserActions = ActionType<typeof authA & typeof userA>;

export const userReducer = (state: IUser = {}, action: UserActions): IUser => {
    switch (action.type) {
        case getType(authA.loginRequest):
            AppToaster.show({ message: "Logger deg inn...", intent: "primary" }, "toast/LOGIN_REQUEST_TOAST");
            return state;

        case getType(authA.loginSuccess):
            AppToaster.dismiss("toast/LOGIN_REQUEST_TOAST");
            AppToaster.show({ message: "Du er nå logget inn.", intent: "success", timeout: 1500 });
            return authService.login("phoney");

        // case getType(authA.loginFailure):
        //     AppToaster.dismiss("toast/LOGIN_REQUEST_TOAST");
        //     AppToaster.show({ message: "Kunne ikke logge deg inn.", intent: "danger" });

        case getType(authA.logout):
            AppToaster.show({ message: "Du er nå logget ut.", intent: "warning" });
            return {};

        case getType(userA.subtractFromBalance):
            return { ...state, balance: (state.balance! - action.payload.delta) };

        default:
            return state;
    }
};

export type UserState = StateType<typeof userReducer>;

export default userReducer;
