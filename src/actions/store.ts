import * as authA from "actions/auth";
import * as userA from "actions/user";
import ow4 from "api/ow4";
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
            const res = await ow4.purchase(getStore());

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
