import * as authA from "actions/auth";
import * as userA from "actions/user";
import { basketPrice } from "helpers/store";
import { IItem } from "models/item";
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

export function purchase() {
    return (
        dispatch: ThunkDispatch<RootState, void, StoreAction | userA.UserAction | authA.AuthAction>,
        getState: () => RootState,
    ) => {
        dispatch(purchaseRequest());

        if (process.env.NODE_ENV === "development") {
            dispatch(userA.subtractFromBalance(basketPrice(getState().store.basket)));
            dispatch(purchaseSuccess());
            dispatch(authA.logout());
        } else {
            fetch(`https://online.ntnu.no/api/v1/orderline/`, {
                body: JSON.stringify({
                    orders: getState().store.basket,
                    user: getState().auth.id,
                }),
                headers: {
                    "Authorization": `Bearer ${getState().auth.token}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
            }).then((res) => {
                if (res.status === 401) {
                    authA.authenticate()(dispatch);
                    return purchase();
                }

                return res.json();
            }).then(() => {
                dispatch(userA.subtractFromBalance(basketPrice(getState().store.basket)));
                dispatch(purchaseSuccess());
                dispatch(authA.logout());
            }, () => (
                dispatch(purchaseFailure())
            ));
        }
    };
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
