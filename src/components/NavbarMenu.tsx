import { Alignment, Button, Navbar } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "reducers/root-reducer";

interface IStateFromProps {
  token?: string;
}

class NavbarMenuContainer extends React.Component<IStateFromProps> {
  public render() {
    return (
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Button className="bp3-minimal" icon="help">Hjelp</Button>
          <Button className="bp3-minimal" icon="git-repo">Rapporter en bug</Button>
        </Navbar.Group>
        {
          this.props.token &&
          <Navbar.Group align={Alignment.RIGHT}>
            <Navbar.Divider />
            <Button className="bp3-minimal" icon="bank-account"></Button>
            <Button className="bp3-minimal" icon="log-out"></Button>
          </Navbar.Group>
        }
      </Navbar>
    );
  }
}

export const NavbarMenu = connect<IStateFromProps, {}, {}, RootState>(
  (state: RootState) => ({ token: state.auth.token }),
)(NavbarMenuContainer);
