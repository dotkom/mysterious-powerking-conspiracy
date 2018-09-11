import { IUser } from "models/user";

export const login = (rfid: string): IUser => {
    return {
        balance: 200,
        id: 0,
        name: "Fredrik A. Madsen-Malmo",
        token: "blablabla",
    } as IUser;
};
