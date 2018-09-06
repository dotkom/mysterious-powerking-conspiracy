import { IItem } from "models/item";
import * as React from "react";
import { connect } from "react-redux";
import { IRootState } from "reducers/root-reducer";

class ItemComponent extends React.Component<IItem> {
    public render() {
        return (
            <div>
                <h2>{this.props.name}</h2>
                <p>{this.props.description}</p>
                <span>Pris: {this.props.price}kr</span>
            </div>
        );
    }
}

export const Item = connect<{}, {}, IItem, IRootState>(null)(ItemComponent);
