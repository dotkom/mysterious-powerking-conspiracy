import * as storeA from "actions/store";
import * as auth from "helpers/auth";
import { IUser } from "models/user";
import { RootState } from "reducers/root-reducer";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ActionType, createAction } from "typesafe-actions";

export const loginSuccess = createAction("auth/LOGIN_SUCCESS", (resolve) => (
    (user: IUser) => resolve({ user })
));
export const loginRequest = createAction("auth/LOGIN_REQUEST");
// export const loginFailure = createAction("auth/LOGIN_FAILURE");

export function signIn(rfid: string): (dispatch: Dispatch<AuthAction | storeA.StoreAction>) => void {
    return (
        dispatch: ThunkDispatch<RootState, void, storeA.StoreAction | AuthAction>,
    ) => {
        dispatch(loginRequest());
        dispatch(storeA.clearBasket()); // clean up basket

        auth.login(rfid).then((user: IUser) => {
            dispatch(loginSuccess(user));
        });
    };
}

export const logout = createAction("auth/LOGOUT");

export type AuthAction = ActionType<
    typeof loginSuccess
    | typeof loginRequest
    | typeof logout
    // | typeof loginFailure
>;
