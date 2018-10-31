import * as authA from "actions/auth";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "reducers/root-reducer";
import { Dispatch } from "redux";

import {
  Alignment,
  Button,
  Callout,
  Classes,
  Colors,
  ControlGroup,
  Navbar,
  NumericInput,
  Popover,
} from "@blueprintjs/core";

interface IStateFromProps {
  id?: number;
  balance?: number;
}

interface IDispatchFromProps {
  logout: () => void;
}

interface IProps extends IStateFromProps, IDispatchFromProps { }

class NavbarMenuContainer extends React.Component<IProps> {
  public render() {
    return this.props.id ? (
      <Button intent="danger" className="logout-button" icon="log-out" onClick={this.props.logout}>Logg ut</Button>
    ) : null;
  }
}

export const NavbarMenu = connect<IStateFromProps, IDispatchFromProps, {}, RootState>(
  (state: RootState) => ({ id: state.auth.id, balance: state.auth.balance }),
  (dispatch: Dispatch<authA.AuthAction>) => ({
    logout: () => dispatch(authA.logout()),
  }),
)(NavbarMenuContainer);
