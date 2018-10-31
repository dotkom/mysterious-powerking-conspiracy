import ow4 from "api/ow4";
import { ILoginUser } from "models/user";

const mockLogin = (): ILoginUser => {
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
        const res = await ow4.login(token, rfid);

        if (res.status === 401) {
            throw new Error("Outdated bearer token");
        } else if (res.ok) {
            const decoded = await res.json();

            if (!decoded.count) {
                throw new Error("No such user.");
            } else {
                const user = decoded.results[0];
                return { id: user.pk, name: `${user.first_name} ${user.last_name}`, balance: user.saldo } as ILoginUser;
            }

        }

        throw new Error("Could not sign in user with RFID");
    }

    return mockLogin());
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
