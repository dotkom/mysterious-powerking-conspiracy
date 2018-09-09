import { ActionType, createAction } from "typesafe-actions";

export const addToBasket = createAction("store/ADD_TO_BASKET", (resolve) => (
    (id: number) => resolve({ id })
));

export const removeFromBasket = createAction("store/REMOVE_FROM_BASKET", (resolve) => (
    (uuid: string) => resolve({ uuid })
));

export const completePurchase = createAction("store/COMPLETE_PURCHASE");

export type StoreAction = ActionType<
    typeof addToBasket
    | typeof removeFromBasket
    | typeof completePurchase
>;
