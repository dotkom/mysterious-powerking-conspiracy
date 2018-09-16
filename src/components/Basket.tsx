import { Tag } from "@blueprintjs/core";
import * as storeA from "actions/store";
import { basketPrice } from "helpers/store";
import { IBasketItem } from "models/item";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "reducers/root-reducer";
import { ThunkDispatch } from "redux-thunk";

interface IStateFromProps {
    basket: IBasketItem[];
    balance?: number;
}

interface IDispatchFromProps {
    purchase: () => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<RootState, void, storeA.StoreAction>): IDispatchFromProps => ({
    purchase: () => dispatch(storeA.purchase()),
});

interface IProps extends IStateFromProps, IDispatchFromProps {}

class BasketContainer extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);

        this.purchaseDisabled = this.purchaseDisabled.bind(this);
    }

    public render() {
        return (
            <div className="basket">
                <Tag large icon="shopping-cart">{this.props.basket.length} artikler</Tag>
                <Tag large icon="bank-account">Total: <b>{basketPrice(this.props.basket)}kr</b></Tag>
            </div>
        );
    }

    private purchaseDisabled(): true | undefined {
        return basketPrice(this.props.basket) > this.props.balance! ? true : undefined;
    }
}

export const Basket = connect<IStateFromProps, IDispatchFromProps, {}, RootState>(
    (state: RootState): IStateFromProps => ({ basket: state.store.basket, balance: state.auth.balance }),
    mapDispatchToProps,
)(BasketContainer);
