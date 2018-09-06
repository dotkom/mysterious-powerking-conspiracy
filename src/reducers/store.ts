import * as storeActions from "actions/store";
import { IBasketItem, IItem } from "models/item";
import { IStore } from "models/store";
import { ActionType, getType } from "typesafe-actions";
import uuidv4 from "uuid/v4";

export type StoreActions = ActionType<typeof storeActions>;

export default (state: IStore = { items: [], basket: [] }, action: StoreActions): IStore => {
    switch (action.type) {
        case getType(storeActions.addToBasket):
            const item: IItem = state.items.filter((e: IItem) => (e.id === action.payload.id))[0];
            return { ...state, basket: [...state.basket, { ...item, uuid: uuidv4() }] };
        case getType(storeActions.removeFromBasket):
            const itemToRemove: IBasketItem = state.basket.filter(
                (basketItem: IBasketItem) => ( basketItem.uuid === action.payload.uuid ),
            )[0];
            const indexOfItemToRemove: number = state.basket.indexOf(itemToRemove);
            return {
                ...state,
                basket: [
                    ...state.basket.slice(0, indexOfItemToRemove),
                    ...state.basket.slice(indexOfItemToRemove + 1),
                ],
            };
        default:
            return state;
    }
};
