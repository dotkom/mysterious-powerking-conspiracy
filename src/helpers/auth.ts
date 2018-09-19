import { ILoginUser } from "models/user";

const mockLogin = (rfid: string): ILoginUser => {
    return {
        balance: 200,
        id: 1,
        name: "Fredrik A. Madsen-Malmo",
    };
};

export function login(rfid: string): Promise<ILoginUser> {
    return new Promise<ILoginUser>((resolve) => resolve(mockLogin(rfid)));
}

interface IAuthResponse {
    scope: string;
    access_token: string;
    expires_in: number;
    token_type: string;
}

export function authenticate(clientId: string, clientSecret: string): Promise<string> {
    return fetch(
        `https://online.ntnu.no/api/v1/auth/?client_id=` +
        `${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}` +
        "&grant_type=client_credentials",
        { method: "post" },
    ).then((response: Response) => {
        if (response.ok) {
            return response.json();
        }

        throw new Error("Invalid response from auth endpoint.");
    }).then((response: IAuthResponse) => (
        response.access_token
    ));
}
