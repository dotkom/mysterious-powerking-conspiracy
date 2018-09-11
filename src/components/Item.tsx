import { IItem } from "models/item";
import * as React from "react";

export class Item extends React.Component<IItem> {
    public render() {
        return (
            <div>
                <h2 className="bp3-heading">{this.props.name}</h2>
                <em className="bp3-text-large">{this.props.price}kr</em>
                <p className="bp3-running-text">{this.props.description}</p>
            </div>
        );
    }
}
