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

interface IProps extends IStateFromProps, IDispatchFromProps {}

class PurchaseButtonContainer extends React.Component<IProps> {
  public render() {
    return (
      <Button
        large
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
            "Kjøp"
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
