import { IUser } from "models/user";

export const login = (username: string, _: string): IUser => {
    return {
        balance: 200,
        id: 0,
        name: "Fredrik A. Madsen-Malmo",
        token: "token",
        username,
    } as IUser;
};
