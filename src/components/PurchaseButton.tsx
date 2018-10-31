import { Button, Spinner } from "@blueprintjs/core";
import * as storeA from "actions/store";
import { IBasketItem } from "models/item";
import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { basketPrice } from "../helpers/store";
import { RootState } from "../reducers/root-reducer";

interface IStateFromProps {
  basket: IBasketItem[];
  purchasing: boolean;
  balance: number;
}

interface IDispatchFromProps {
  purchase: () => void;
}

interface IProps extends IStateFromProps, IDispatchFromProps { }

class PurchaseButtonContainer extends React.Component<IProps> {
  public render() {
    let purchaseButtonLabelText: string;

    switch (this.props.basket.length) {
      case 1:
        purchaseButtonLabelText = `Kjøp 1 vare for ${this.props.basket[0].price}kr`;
        break;
      default:
        purchaseButtonLabelText = `Kjøp ${this.props.basket.length} varer for ${basketPrice(this.props.basket)}kr`;
        break;
    }

    if (this.props.basket.length === 0) {
      purchaseButtonLabelText = "Legg til varer for å betale";
    } else {
      if (basketPrice(this.props.basket) > this.props.balance) {
        purchaseButtonLabelText =
          `Du har ikke nok penger (mangler ${Math.abs(this.props.balance - basketPrice(this.props.basket))}kr).`;
      } else {
        purchaseButtonLabelText =
          `Kjøp ${this.props.basket.length}
           vare${this.props.basket.length === 1 ? "" : "r"}
           for ${basketPrice(this.props.basket)}kr`;
      }
    }

    return (
      <Button
        large
        className="purchase-button"
        disabled={this.props.basket.length === 0 || this.props.balance < basketPrice(this.props.basket)}
        intent={
          this.props.balance < basketPrice(this.props.basket) ?
            "danger" : "success"
        }
        onClick={this.props.purchase}
      >
        {
          this.props.purchasing ?
            <Spinner size={24} intent="none" /> :
            purchaseButtonLabelText
        }
      </Button>
    );
  }
}

export const PurchaseButton = connect<IStateFromProps, IDispatchFromProps, {}, RootState>(
  (state: RootState) => ({
    balance: state.auth.balance!,
    basket: state.store.basket,
    purchasing: state.store.meta.purchasing,
  }),
  (dispatch: ThunkDispatch<RootState, void, storeA.StoreAction>) => ({
    purchase: () => dispatch(storeA.purchase()),
  }),
)(PurchaseButtonContainer);
