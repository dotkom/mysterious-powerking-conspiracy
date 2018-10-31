import { Intent, Tag } from "@blueprintjs/core";
import Portrait from "assets/portrait.jpg";
import { basketPrice } from "helpers/store";
import { IUser } from "models/user";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "reducers/root-reducer";
import { Login } from "./Login";

interface IStateFromProps {
  user: IUser;
  basketPrice: number;
}

class NavbarUserSectionContainer extends React.Component<IStateFromProps> {
  private intent: Intent = "none";

  public render() {
    if (this.props.basketPrice === 0) {
      this.intent = "none";
    } else if (this.props.user.balance! >= this.props.basketPrice) {
      this.intent = "success";
    } else {
      this.intent = "danger";
    }

    if (this.props.user.id) {
      return (
        <div className="user-section">
          <div className="user">
            <h2 className="bp3-heading">{this.props.user.name}</h2>
            <Tag
              large
              icon="bank-account"
              intent={this.intent}
            >
              {
                this.props.basketPrice === 0 ?
                  <span>{this.props.user.balance}kr</span> :
                  <span>{this.props.user.balance! - this.props.basketPrice}kr ({this.props.user.balance}kr)</span>
              }
            </Tag>
          </div>
        </div>
      );
    }

    return <Login />;
  }
}

export const NavbarUserSection = connect<IStateFromProps, {}, {}, RootState>(
  (state: RootState) => ({ user: state.auth, basketPrice: basketPrice(state.store.basket) }),
)(NavbarUserSectionContainer);
