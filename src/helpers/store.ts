import { IBasketItem, IItem } from "models/item";

export const testItems: IItem[] = [
    {
        description: "Two snickers. Du-uh.",
        id: 0,
        name: "Snickers 2p",
        price: 17,
    },
    {
        description: "Lollipop.",
        id: 2,
        name: "Lollipop",
        price: 3,
    },
    {
        description: "Billig, dog robust bil. Lite brukt i vesten.",
        id: 3,
        name: "Lada",
        price: 150,
    },
    {
        description: "Mors nudler.",
        id: 4,
        name: "MAMA Nudel",
        price: 20,
    },
];

export function basketPrice(basket: IBasketItem[]): number {
    return basket.reduce<number>((total: number, currentBasketItem: IBasketItem) => (
        total + currentBasketItem.price
    ), 0);
}
