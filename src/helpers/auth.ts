import ow4 from "api/ow4";
import { ILoginUser } from "models/user";

const mockLogin = (rfid: string): ILoginUser => {
    return {
        balance: 29,
        id: 1429,
        name: "Fredrik A. Madsen-Malmo",
    };
};

interface ILoginResponse {
    count: number;
    next: any;
    previous: any;
    results: Array<{
        pk: number;
        first_name: string;
        last_name: string;
        saldo: number;
    }>;
}

export async function login(rfid: string, token: string): Promise<ILoginUser> {
    if (process.env.NODE_ENV === "production") {
        const res = await fetch(
            `https://online.ntnu.no/api/v1/usersaldo/?rfid=${rfid}`,
            { headers: { Authorization: `Bearer ${token}` } },
        );

        if (res.status === 401) {
            throw new Error("Outdated bearer token");
        }

        if (res.ok) {
            const data = await res.json() as ILoginResponse;

            const user = data.results[0];

            return { id: user.pk, name: `${user.first_name} ${user.last_name}`, balance: user.saldo };
        }

        throw new Error("Could not sign in user with RFID");
    }

    return new Promise<ILoginUser>((resolve) => resolve(mockLogin(rfid)));
}

interface IAuthResponse {
    scope: string;
    access_token: string;
    expires_in: number;
    token_type: string;
}

export async function authenticate(): Promise<string> {
    const response = await ow4.authenticate();

    if (response.ok) {
        return (await response.json() as IAuthResponse).access_token;
    } else {
        throw new Error("Invalid response from auth endpoint.");
    }
}
