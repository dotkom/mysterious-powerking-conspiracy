import * as storeA from "actions/store";
import { Item } from "components/Item";
import { IItem } from "models/item";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "reducers/root-reducer";
import { Dispatch } from "redux";

interface IDispatchFromProps {
    addToBasket: (id: number) => void;
}

const mapDispatchToProps = (
    dispatch: Dispatch<storeA.StoreAction>,
): IDispatchFromProps => ({
    addToBasket: (id: number) => dispatch(storeA.addToBasket(id)),
});

interface IProps extends IDispatchFromProps, IItem {}

class StoreItemContainer extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);

        this.addToCart = this.addToCart.bind(this);
    }

    public render() {
        return (
            <div>
                <Item {...this.props} />
                <button onClick={this.addToCart}>Legg til i handlekurven</button>
            </div>
        );
    }

    private addToCart() {
        this.props.addToBasket(this.props.id);
    }
}

export const StoreItem = connect<{}, IDispatchFromProps, IItem, RootState>(
    null,
    mapDispatchToProps,
)(StoreItemContainer);
