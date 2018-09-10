import { ActionType, createAction } from "typesafe-actions";

// TODO: Thunk this and dispatch purchaseSuccess from store actions to clean basket
export const login = createAction("auth/LOGIN", (resolve) => (
    (username: string, password: string) => resolve({ username, password })
));

export const logout = createAction("auth/LOGOUT");

export type AuthAction = ActionType<
    typeof login
    | typeof logout
>;
