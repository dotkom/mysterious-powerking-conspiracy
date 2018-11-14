import "jest";

import { IBasketItem } from "models/item";
import { prepareBasket } from "./ow4";

const baseItem = {
        description: "Describing test item",
        id: 1,
        imageURL: "",
        name: "Test Item",
        price: 1,
        uuid: "abcd",
    };

const items: IBasketItem[] = [
    { ...baseItem, id: 1 },
    { ...baseItem, id: 2 },
    { ...baseItem, id: 3 },
    { ...baseItem, id: 3 },
    { ...baseItem, id: 3 },
    { ...baseItem, id: 2 },
];

describe("OW4 API", () => {
    test("prepareBasket returns a list of object_keys with corresponding amount", () => {
        expect(prepareBasket(items)).toEqual([
            { object_id: "1", amount: 1 },
            { object_id: "2", amount: 2 },
            { object_id: "3", amount: 3 },
        ]);
    });

    test("prepareBasket returns an empty list if no items", () => {
        expect(prepareBasket([])).toEqual([]);
    });
});
