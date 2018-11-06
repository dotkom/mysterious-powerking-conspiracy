import * as authA from "actions/auth";
import * as userA from "actions/user";
import { AppToaster } from "helpers/toaster";
import { IUser } from "models/user";
import { ActionType, getType, StateType } from "typesafe-actions";

export type UserActions = ActionType<typeof authA & typeof userA>;

export const userReducer = (state: IUser = {}, action: UserActions): IUser => {
    ["REQUEST", "SUCCESS", "FAILURE"].forEach((e) => {
        AppToaster.dismiss(`toast/LOGIN_${e}`);
        AppToaster.dismiss(`toast/AUTH_${e}`);
    });

    switch (action.type) {
        case getType(authA.loginRequest):
            AppToaster.show({ message: "Logger inn...", intent: "primary" }, "toast/LOGIN_REQUEST");
            return state;

        case getType(authA.loginSuccess):
            AppToaster.show(
                { message: "Du er nå logget inn.", intent: "success", timeout: 1500 },
                "toast/LOGIN_SUCCESS",
            );
            return { ...state, ...action.payload.user };

        case getType(authA.loginFailure):
            AppToaster.show(
                { message: "Kunne ikke logge deg inn.", intent: "danger" },
                "toast/LOGIN_FAILURE",
            );
            return state;

        case getType(authA.authRequest):
            AppToaster.show(
                { message: "Autentiserer Nibble...", intent: "primary", timeout: 1500 },
                "toast/AUTH_REQUEST",
            );
            return state;

        case getType(authA.authFailure):
            AppToaster.show(
                { message: "Autentisering feilet.", intent: "warning", timeout: 1500 },
                "toast/AUTH_FAILURE",
            );
            return state;

        case getType(authA.authSuccess):
            AppToaster.show(
                { message: "Nibble er nå autentisert.", intent: "success", timeout: 1500 },
                "toast/AUTH_SUCCESS",
            );
            return { ...state, token: action.payload.token };

        case getType(authA.logout):
            AppToaster.show({ message: "Du er nå logget ut.", intent: "warning", timeout: 1500 });
            return { token: state.token };

        case getType(userA.subtractFromBalance):
            return { ...state, balance: (state.balance! - action.payload.delta) };

        default:
            return state;
    }
};

export type UserState = StateType<typeof userReducer>;

export default userReducer;
