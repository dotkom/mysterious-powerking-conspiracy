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
    return (
      <Navbar style={{ background: Colors.DARK_GRAY1 }}>
        <Navbar.Group align={Alignment.LEFT}>
          <Button className="bp3-minimal" icon="help" style={{ color: Colors.WHITE }}>Hjelp</Button>
          <Button
            className="bp3-minimal"
            onClick={
              () => window.open("https://github.com/dotkom/mysterious-powerking-conspiracy/issues/new", "_blank")
            }
            icon="git-repo"
            style={{ color: Colors.WHITE }}
          >
            Rapporter en bug
          </Button>
        </Navbar.Group>
        {
          this.props.id &&
          <Navbar.Group align={Alignment.RIGHT}>
            <Navbar.Divider />
            <Button intent="danger" icon="log-out" onClick={this.props.logout}>Logg ut</Button>
          </Navbar.Group>
        }
      </Navbar>
    );
  }
}

export const NavbarMenu = connect<IStateFromProps, IDispatchFromProps, {}, RootState>(
  (state: RootState) => ({ id: state.auth.id, balance: state.auth.balance }),
  (dispatch: Dispatch<authA.AuthAction>) => ({
    logout: () => dispatch(authA.logout()),
  }),
)(NavbarMenuContainer);
