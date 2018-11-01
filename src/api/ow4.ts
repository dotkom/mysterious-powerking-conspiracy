import { IBasketItem } from "models/item";
import { RootState } from "reducers/root-reducer";
import secrets from "../secrets";

const OW4_BASE = "https://online.ntnu.no/api/v1/";

interface IAPIBasketItem {
    object_id: string;
    amount: number;
}

function prepareBasket(basket: IBasketItem[]): IAPIBasketItem[] {
    const counted = basket.reduce((curr, item) => ({
            ...curr,
            [item.id]: {
                object_id: item.id,
                amount: (curr[item.id] && curr[item.id].amount) ? curr[item.id].amount + 1 : 1,
            },
        }), {});
    
    return Object.keys(counted)
        .map(key => counted[key]);
}

export default {
    authenticate: (): Promise<Response> => (
        fetch(
            `${OW4_BASE}auth/?client_id=` +
            `${encodeURIComponent(secrets.clientId)}&client_secret=${encodeURIComponent(secrets.clientSecret)}` +
            "&grant_type=client_credentials",
            { method: "post" },
        )
    ),
    login: (token: string, rfid: string): Promise<Response> => (
        fetch(
            `${OW4_BASE}usersaldo/?rfid=${rfid}`,
            { headers: { authorization: `bearer ${token}` } },
        )
    ),
    purchase: (state: RootState): Promise<Response> => (
        fetch(`${OW4_BASE}orderline/`, {
                body: JSON.stringify({
                    orders: prepareBasket(state.store.basket),
                    user: state.auth.id,
                }),
                headers: {
                    "Authorization": `Bearer ${state.auth.token}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
            })
     ),
    retrieveStoreItems: (): Promise<Response> => (
        fetch(`${OW4_BASE}inventory/`)
    ),
};
