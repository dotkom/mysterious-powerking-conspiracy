export interface IItem {
    id: number;
    name: string;
    description: string;
    price: number;
    imageURL?: string;
}

export interface IBasketItem extends IItem {
    uuid: string;
}
