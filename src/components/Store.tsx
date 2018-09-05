import { Item } from "components/Item";
import { IItem } from "models/item";
import * as React from "react";
import { connect } from "react-redux";
import { IRootState } from "reducers/root-reducer";

interface IStateFromProps {
    items: IItem[];
}

class StoreContainer extends React.Component<IStateFromProps> {
    public render() {
        const items = this.props.items.map((item: IItem) => (
            <Item key={item.id} {...item} />
        ));

        return (
            <div>
                {items}
            </div>
        );
    }
}

export const Store = connect<IStateFromProps, {}, {}, IRootState>(
    (state: IRootState): IStateFromProps => ({
        items: state.store.items,
    }),
)(StoreContainer);
