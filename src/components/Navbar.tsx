import { Icon } from "@blueprintjs/core";
import { NavbarMenu } from "components/NavbarMenu";
import { NavbarUserSection } from "components/NavbarUserSection";
import { ShoppingCart } from "components/ShoppingCart";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "reducers/root-reducer";
import { PurchaseButton } from "./PurchaseButton";

interface IStateFromProps {
  id?: number;
}

class NavbarContainer extends React.Component<IStateFromProps> {
  public render() {
    return (
      <div className="navbar">
        <h1 className="bp3-heading brand"><Icon icon="git-new-branch" iconSize={30} /> Nibble</h1>
        <NavbarMenu />
        { this.props.id && <ShoppingCart /> }
        { this.props.id && <PurchaseButton /> }
        <NavbarUserSection />
      </div>
    );
  }
}

export const Navbar = connect<IStateFromProps, {}, {}, RootState>(
  (state: RootState) => ({
    id: state.auth.id,
  }),
)(NavbarContainer);
