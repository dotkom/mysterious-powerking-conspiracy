import { IBasketItem } from "models/item";
import { RootState } from "reducers/root-reducer";
import secrets from "../secrets";

const OW4_BASE = "https://online.ntnu.no/api/v1/";

interface IAPIBasketItem {
    object_id: string;
    amount: number;
}

function prepareBasket(basket: IBasketItem[]): IAPIBasketItem[] {
    const count: {[id: string]: number} = {};

    basket.forEach((bItem) => {
        if (!count[bItem.id]) {
            count[bItem.id] = 1;
        } else {
            count[bItem.id]++;
        }
    });

    return Object.keys(count).map((k) => ({ object_id: k, amount: count[k] }));
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
