import { IUser } from "models/user";

export const login = (username: string, password: string): IUser => {
    return {
        balance: 200,
        id: 0,
        name: "Test User",
        token: "okidoki",
        username,
    } as IUser;
};

export const isLoggedIn = (user: IUser): boolean => (
    user.token !== undefined
);
