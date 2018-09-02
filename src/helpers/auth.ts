import { IUser } from "models/user";
import store from "../store";

export const login = (username: string, password: string): IUser => {
    return {
        id: 0,
        name: "Test User",
        token: "okidoki",
        username: "testuser",
    } as IUser;
};

export const isLoggedIn = (): boolean => (
    store.getState().auth.token !== undefined
);
