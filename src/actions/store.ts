import * as authA from "actions/auth";
import * as userA from "actions/user";
import { basketPrice } from "helpers/store";
import { IBasketItem, IItem } from "models/item";
import { RootState } from "reducers/root-reducer";
import { ThunkDispatch } from "redux-thunk";
import { ActionType, createAction } from "typesafe-actions";

export const addToBasket = createAction("store/ADD_TO_BASKET", (resolve) => (
    (id: number) => resolve({ id })
));

export const removeFromBasket = createAction("store/REMOVE_FROM_BASKET", (resolve) => (
    (uuid: string) => resolve({ uuid })
));

export const addItem = createAction("store/ADD_ITEM", (resolve) => (
    (item: IItem) => resolve({ item })
));

export const clearBasket = createAction("store/CLEAR_BASKET");

export const purchaseRequest = createAction("store/PURCHASE_REQUEST");
export const purchaseSuccess = createAction("store/PURCHASE_SUCCESS");
export const purchaseFailure = createAction("store/PURCHASE_FAILURE");

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

export function purchase() {
    const callback = async (
        dispatch: ThunkDispatch<RootState, void, StoreAction | userA.UserAction | authA.AuthAction>,
        getStore: () => RootState,
    ) => {
        dispatch(purchaseRequest());

        if (process.env.NODE_ENV === "development") {
            dispatch(userA.subtractFromBalance(basketPrice(getStore().store.basket)));
            dispatch(purchaseSuccess());
            dispatch(authA.logout());
        } else {
            const res = await fetch(`https://online.ntnu.no/api/v1/orderline/`, {
                body: JSON.stringify({
                    orders: prepareBasket(getStore().store.basket),
                    user: getStore().auth.id,
                }),
                headers: {
                    "Authorization": `Bearer ${getStore().auth.token}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
            });

            if (res.status === 401) {
                authA.authenticate()(dispatch);
                dispatch(purchaseFailure());
                callback(dispatch, getStore); // recurse
            }

            dispatch(userA.subtractFromBalance(basketPrice(getStore().store.basket)));
            dispatch(purchaseSuccess());
            dispatch(authA.logout());
        }
    };

    return callback;
}

export type StoreAction = ActionType<
    typeof addToBasket
    | typeof removeFromBasket
    | typeof purchaseRequest
    | typeof purchaseSuccess
    | typeof purchaseFailure
    | typeof clearBasket
    | typeof addItem
    >;
