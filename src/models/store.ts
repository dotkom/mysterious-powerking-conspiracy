import { IBasketItem, IItem } from "models/item";

export interface IStore {
    items: IItem[];
    basket: IBasketItem[];
}
