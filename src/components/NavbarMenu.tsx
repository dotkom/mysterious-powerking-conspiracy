import { Card, Elevation } from "@blueprintjs/core";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "reducers/root-reducer";

interface IStateFromProps {
  token?: string;
}

export class NavbarMenuContainer extends React.Component<IStateFromProps> {
  public render() {
    return (
      <Card elevation={Elevation.ONE}>
        <div className="menu">
          <h3 className="bp3-heading">Meny</h3>
          <ul className="bp3-list bp3-list-unstyled">
            <li>
              <a href="#">Hjelp</a>
            </li>
            <li>
              <a href="#">Rapporter en bug</a>
            </li>
            {
              this.props.token &&
              (
                <li>
                  <a href="#">Juster saldo</a>
                </li>
              )
            }
            {
              this.props.token &&
              (
                <li>
                  <a href="#">Logg ut</a>
                </li>
              )
            }
          </ul>
        </div>
      </Card>
    );
  }
}

export const NavbarMenu = connect<IStateFromProps, {}, {}, RootState>(
  (state: RootState) => ({ token: state.auth.token }),
)(NavbarMenuContainer);
