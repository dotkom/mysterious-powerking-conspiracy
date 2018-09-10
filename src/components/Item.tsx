import { IItem } from "models/item";
import * as React from "react";

export const Item = ({ name, description, price }: IItem) => (
    <div>
        <h2 className="bp3-heading">{ name }</h2>
        <em className="bp3-text-large">{price}kr</em>
        <p className="bp3-running-text">{ description }</p>
    </div>
);
