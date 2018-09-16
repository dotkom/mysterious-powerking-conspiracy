import { IBasketItem } from "models/item";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "reducers/root-reducer";
import { ShoppingCartItem } from "./ShoppingCartItem";

interface IStateFromProps {
  basket: IBasketItem[];
}

class ShoppingCartContainer extends React.Component<IStateFromProps> {
  public render() {
    let contentCartContent: React.ReactNode;

    if (this.props.basket.length === 0) {
      contentCartContent = (
        <h4 className="bp3-heading"><em>Din handlekurv er tom.</em></h4>
      );
    } else {
      interface ITally {
        [id: number]: number;
      }

      const tally: ITally = this.props.basket.reduce<ITally>((counter: ITally, item: IBasketItem) => {
        if (counter[item.id]) {
          counter[item.id]++;
        } else {
          counter[item.id] = 1;
        }

        return counter;
      }, {});

      contentCartContent = Object.entries(tally).map(([id, count]) => {
        return (
          <ShoppingCartItem
            key={id}
            item={this.props.basket.find((item: IBasketItem) => (item.id === Number(id)))!}
            count={count}
          />
        );
       });
    }

    return (
      <div className="shopping-cart">
        <h2 className="bp3-heading">Handlekurv</h2>
        <hr />
        {contentCartContent}
      </div>
    );
  }
}

export const ShoppingCart = connect<IStateFromProps, {}, {}, RootState>(
  (state: RootState) => ({
    basket: state.store.basket,
  }),
)(ShoppingCartContainer);
