import { BasketItem } from "components/BasketItem";
import { IBasketItem } from "models/item";
import * as React from "react";
import { connect } from "react-redux";
import { IRootState } from "reducers/root-reducer";

interface IStateFromProps {
    basket: IBasketItem[];
}

class BasketContainer extends React.Component<IStateFromProps> {
    public render() {
        return (
            <div>
                <h2>Handlekurv</h2>
                {this.props.basket.map((item: IBasketItem, index: number) => (
                    <BasketItem key={index} {...item} />
                ))}
            </div>
        );
    }
}

export const Basket = connect<IStateFromProps, {}, {}, IRootState>(
    (state: IRootState): IStateFromProps => ({ basket: state.store.basket })
)(BasketContainer);
