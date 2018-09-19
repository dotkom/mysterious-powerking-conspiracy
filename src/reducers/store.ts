import * as storeA from "actions/store";
import { AppToaster } from "helpers/toaster";
import { IBasketItem, IItem } from "models/item";
import { IStore } from "models/store";
import { getType, StateType } from "typesafe-actions";
import uuidv4 from "uuid/v4";

export const storeReducer = (
    state: IStore = { items: [], basket: [], meta: { purchasing: false } },
    action: storeA.StoreAction,
): IStore => {
    switch (action.type) {
        case getType(storeA.addItem):
            return { ...state, items: [...state.items, action.payload.item] };

        case getType(storeA.addToBasket):
            const item: IItem = state.items.filter((e: IItem) => (e.id === action.payload.id))[0];
            AppToaster.show({ message: `Lagt til ${item.name} i handlekurven.`, timeout: 1000 });

            return { ...state, basket: [...state.basket, { ...item, uuid: uuidv4() }] };

        case getType(storeA.removeFromBasket):
            const itemToRemove: IBasketItem = state.basket.filter(
                (basketItem: IBasketItem) => (basketItem.uuid === action.payload.uuid),
            )[0];

            AppToaster.show({
                intent: "warning",
                message: `Fjernet 1x ${itemToRemove.name} fra handlekurven.`,
                timeout: 1000,
            });

            const indexOfItemToRemove: number = state.basket.indexOf(itemToRemove);

            return {
                ...state,
                basket: [
                    ...state.basket.slice(0, indexOfItemToRemove),
                    ...state.basket.slice(indexOfItemToRemove + 1),
                ],
            };

        case getType(storeA.purchaseRequest):
            AppToaster.show(
                { message: "Forsøker å gjennomføre handel...", intent: "primary" },
                "toast/PURCHASE_REQUEST",
            );

            return { ...state, meta: { purchasing: true } };

        case getType(storeA.purchaseSuccess):
            AppToaster.dismiss("toast/PURCHASE_REQUEST");
            AppToaster.show({ message: "Handel gjennomført! Takk for din handel.", intent: "success", timeout: 2000 });

            return { ...state, basket: [], meta: { purchasing: false } };

        case getType(storeA.purchaseFailure):
            AppToaster.dismiss("toast/PURCHASE_REQUEST");
            AppToaster.show({ message: "Kunne ikke gjennomføre handel.", intent: "danger" });

            return { ...state, meta: { purchasing: false } };

        case getType(storeA.clearBasket):
            return { ...state, basket: [] };

        default:
            return state;
    }
};

export type StoreState = StateType<typeof storeReducer>;

export default storeReducer;
