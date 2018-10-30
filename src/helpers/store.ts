import ow4 from "api/ow4";
import { IBasketItem, IItem } from "models/item";

const testItems: IItem[] = [
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
        description: "Superkult produkt.",
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

interface IJSONItem {
    pk: number;
    name: string;
    price: number;
    description: string;
    image?: {
        id: number;
        name: string;
        timestamp: string;
        description: string;
        thumb: string;
        original: string;
        wide: string;
        lg: string;
        md: string;
        sm: string;
        xs: string;
        tags: string[];
        photographer: string;
    };
    category: {
        pk: number;
        name: string;
    };
}

const IMAGE_BASE = "https://online.ntnu.no/";

export async function retrieveStoreItems(): Promise<IItem[]> {
    if (process.env.NODE_ENV === "production") {
        const response = await ow4.retrieveStoreItems();
        const items: IJSONItem[] = await response.json();

        return items.map((item: IJSONItem): IItem => ({
                description: item.description,
                id: item.pk,
                imageURL: item.image ? `${IMAGE_BASE}${item.image.sm}` : undefined,
                name: item.name,
                price: item.price,
            }
        ));
    } else {
        return testItems;
    }
}

export function basketPrice(basket: IBasketItem[]): number {
    return basket.reduce<number>((total: number, currentBasketItem: IBasketItem) => (
        total + currentBasketItem.price
    ), 0);
}
