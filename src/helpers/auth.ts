import { IUser } from "models/user";

const mockLogin = (rfid: string): IUser => {
    return {
        balance: 200,
        id: 0,
        name: "Fredrik A. Madsen-Malmo",
        token: "blablabla",
    } as IUser;
};

export function login(rfid: string): Promise<IUser> {
    return new Promise<IUser>((resolve) => resolve(mockLogin(rfid)));
}
