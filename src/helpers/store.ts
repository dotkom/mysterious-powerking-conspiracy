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
        description: "Billig, dog robust bil. Lite brukt i vesten. Самая лучшая машина в мире.",
        id: 3,
        name: "Lada",
        price: 150,
    },
    {
        description: "Mors nudler.",
        id: 4,
        name: "MAMA Nudel",
        price: 10,
    },
    {
        description: "Energi på boks.",
        id: 5,
        name: "Powerking",
        price: 8,
    },
    {
        description: "Sprudlende glede.",
        id: 6,
        name: "Moët Champagne",
        price: 9,
    },
    {
        description: "Super kult produkt.",
        id: 7,
        name: "SuperProdukt 12",
        price: 49,
    },
    {
        description: "What is this? A crossover episode?",
        id: 8,
        name: "Laban Bamsemums",
        price: 136,
    },
    {
        description: "Koster nesten pi (ha-ha).",
        id: 9,
        name: "Pai",
        price: 3,
    },
];

export function basketPrice(basket: IBasketItem[]): number {
    return basket.reduce<number>((total: number, currentBasketItem: IBasketItem) => (
        total + currentBasketItem.price
    ), 0);
}
