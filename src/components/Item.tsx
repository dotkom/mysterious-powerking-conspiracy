import { IItem } from "models/item";
import * as React from "react";

export const Item = ({ name, description, price }: IItem) => (
    <div>
        <h2>{ name }</h2>
        <p>{ description }</p>
        <span>Pris: { price }kr</span>
    </div>
);
