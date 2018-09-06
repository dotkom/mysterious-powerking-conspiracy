import * as storeActions from "actions/store";
import { Item } from "components/Item";
import { IBasketItem } from "models/item";
import * as React from "react";
import { connect } from "react-redux";
import { IRootState } from "reducers/root-reducer";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

interface IDispatchFromProps {
    removeFromBasket: (id: string) => void;
}

const mapDispatchToProps = (
    dispatch: Dispatch<ActionType<typeof storeActions>>,
): IDispatchFromProps => ({
    removeFromBasket: (id: string) => dispatch(storeActions.removeFromBasket(id)),
});

interface IProps extends IDispatchFromProps, IBasketItem {}

class StoreItemContainer extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);

        this.removeFromCart = this.removeFromCart.bind(this);
    }

    public render() {
        return (
            <div>
                <Item {...this.props} />
                <button onClick={this.removeFromCart}>Fjern fra handlekurven</button>
            </div>
        );
    }

    private removeFromCart() {
        this.props.removeFromBasket(this.props.uuid);
    }
}

export const BasketItem = connect<{}, IDispatchFromProps, IBasketItem, IRootState>(
    null,
    mapDispatchToProps,
)(StoreItemContainer);
