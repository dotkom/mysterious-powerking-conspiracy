import { StoreItem } from "components/StoreItem";
import { IItem } from "models/item";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "reducers/root-reducer";

interface IStateFromProps {
    items: IItem[];
}

class StoreContainer extends React.Component<IStateFromProps> {
    public render() {
        const items = this.props.items.map((item: IItem) => (
            <StoreItem key={item.id} {...item} />
        ));

        return (
            <div className="store">
                <div className="items">
                    {items}
                </div>
            </div>
        );
    }
}

export const Store = connect<IStateFromProps, {}, {}, RootState>(
    (state: RootState): IStateFromProps => ({
        items: state.store.items,
    }),
)(StoreContainer);
