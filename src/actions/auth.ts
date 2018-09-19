import * as storeA from "actions/store";
import * as auth from "helpers/auth";
import { ILoginUser } from "models/user";
import { RootState } from "reducers/root-reducer";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ActionType, createAction } from "typesafe-actions";

export const loginSuccess = createAction("auth/LOGIN_SUCCESS", (resolve) => (
    (user: ILoginUser) => resolve({ user })
));
export const loginRequest = createAction("auth/LOGIN_REQUEST");
export const loginFailure = createAction("auth/LOGIN_FAILURE");

export function signIn(rfid: string): (
    dispatch: ThunkDispatch<RootState, void, AuthAction | storeA.StoreAction>,
) => void {
    return (
        dispatch: ThunkDispatch<RootState, void, storeA.StoreAction | AuthAction>,
    ) => {
        dispatch(loginRequest());
        dispatch(storeA.clearBasket());

        auth.login(rfid).then((user: ILoginUser) => {
            dispatch(loginSuccess(user));
        });
    };
}

export const authRequest = createAction("auth/AUTH_REQUEST");
export const authFailure = createAction("auth/AUTH_FAILURE");
export const authSuccess = createAction("auth/AUTH_SUCCESS", (resolve) => (
    (token: string) => resolve({ token })
));

export function authenticate(clientId: string, clientSecret: string): (dispatch: Dispatch<AuthAction>) => void {
    return (
        dispatch: ThunkDispatch<RootState, void, AuthAction>,
    ) => {
        dispatch(authRequest());

        auth.authenticate(clientId, clientSecret)
            .then((token: string) => dispatch(authSuccess(token)))
            .catch((error) => dispatch(authFailure()));
    };
}

export const logout = createAction("auth/LOGOUT");

export type AuthAction = ActionType<
    typeof loginSuccess
    | typeof loginRequest
    | typeof logout
    | typeof authSuccess
    | typeof authRequest
    | typeof authFailure
    // | typeof loginFailure
>;
