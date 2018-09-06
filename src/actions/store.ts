import { createAction } from "typesafe-actions";

export const addToBasket = createAction("store/ADD_TO_BASKET", (resolve) => (
    (id: number) => resolve({ id })
));

export const removeFromBasket = createAction("store/REMOVE_FROM_BASKET", (resolve) => (
    (uuid: string) => resolve({ uuid })
));
