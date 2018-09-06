import { IUser } from "models/user";
import store from "../store";

export const login = (username: string, password: string): IUser => {
    return {
        balance: 200,
        id: 0,
        name: "Test User",
        token: "okidoki",
        username,
    } as IUser;
};

export const isLoggedIn = (): boolean => (
    store.getState().auth.token !== undefined
);
