import * as storeA from "actions/store";
import { IBasketItem, IItem } from "models/item";
import { IStore } from "models/store";
import { getType, StateType } from "typesafe-actions";
import uuidv4 from "uuid/v4";

export const storeReducer = (state: IStore = { items: [], basket: [] }, action: storeA.StoreAction): IStore => {
    switch (action.type) {
        case getType(storeA.addToBasket):
            const item: IItem = state.items.filter((e: IItem) => (e.id === action.payload.id))[0];
            return { ...state, basket: [...state.basket, { ...item, uuid: uuidv4() }] };
        case getType(storeA.removeFromBasket):
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
        case getType(storeA.purchaseRequest):
            alert("REQUESTING");
            return state;
        case getType(storeA.purchaseSuccess):
            alert("SUCCESS");
            return { ...state, basket: [] };
        case getType(storeA.purchaseFailure):
            alert("FAILURE");
            return state;
        default:
            return state;
    }
};

export type StoreState = StateType<typeof storeReducer>;

export default storeReducer;
