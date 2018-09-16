import { IBasketItem, IItem } from "models/item";

interface IStoreMeta {
    purchasing: boolean;
}

export interface IStore {
    items: IItem[];
    basket: IBasketItem[];
    meta: IStoreMeta;
}
