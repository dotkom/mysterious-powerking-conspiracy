import { Button, Card, Elevation } from "@blueprintjs/core";
import * as storeA from "actions/store";
import { IBasketItem } from "models/item";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "reducers/root-reducer";
import { Dispatch } from "redux";

interface IOwnProps {
  count: number;
  item: IBasketItem;
}

interface IDispatchFromProps {
  removeFromBasket: (uuid: string) => void;
}

interface IProps extends IOwnProps, IDispatchFromProps {}

class ShoppingCartItemContainer extends React.Component<IProps> {
  public render() {
    return (
      <Card
        elevation={Elevation.ONE}
        className="shopping-cart-item"
        onClick={() => this.props.removeFromBasket(this.props.item.uuid)}
      >
        <div>
          <h4 className="bp3-heading">
            {this.props.count}x {this.props.item.name}
          </h4>
          <h5 className="bp3-heading">
            {this.props.item.price}kr pp. {this.props.item.price * this.props.count}kr totalt
          </h5>
        </div>
        <div className="remove-button">
          <Button icon="minus"></Button>
        </div>
      </Card>
    );
  }
}

export const ShoppingCartItem = connect<{}, IDispatchFromProps, IOwnProps, RootState>(
  null,
  (dispatch: Dispatch<storeA.StoreAction>) => ({
    removeFromBasket: (uuid: string) => dispatch(storeA.removeFromBasket(uuid)),
  }),
)(ShoppingCartItemContainer);
