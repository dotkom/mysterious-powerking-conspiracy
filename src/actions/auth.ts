import * as storeA from "actions/store";
import { RootState } from "reducers/root-reducer";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ActionType, createAction } from "typesafe-actions";

// TODO: Thunk this and dispatch purchaseSuccess from store actions to clean basket
export const loginSuccess = createAction("auth/LOGIN_SUCCESS", (resolve) => (
    (username: string, password: string) => resolve({ username, password })
));
export const loginRequest = createAction("store/LOGIN_REQUEST");
// export const purchaseFailure = createAction("store/PURCHASE_FAILURE");

export function signIn(
    username: string,
    password: string,
): (dispatch: Dispatch<AuthAction | storeA.StoreAction>) => void {
    return (
        dispatch: ThunkDispatch<RootState, void, storeA.StoreAction | AuthAction>,
    ) => {
        dispatch(loginRequest());
        dispatch(storeA.clearBasket()); // clean up basket
        dispatch(loginSuccess(username, password));
    };
}

export const logout = createAction("auth/LOGOUT");

export type AuthAction = ActionType<
    typeof loginSuccess
    | typeof loginRequest
    | typeof logout
>;
