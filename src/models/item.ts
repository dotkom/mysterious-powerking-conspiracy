export interface IItem {
    id: number;
    name: string;
    description: string;
    price: number;
}

export interface IBasketItem extends IItem {
    uuid: string;
}
