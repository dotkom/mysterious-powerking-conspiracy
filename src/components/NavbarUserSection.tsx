import { Button, Card, Elevation } from "@blueprintjs/core";
import * as authA from "actions/auth";
import { IUser } from "models/user";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "reducers/root-reducer";
import { Dispatch } from "redux";
import { Login } from "./Login";

interface IStateFromProps {
  user: IUser;
}

class NavbarUserSectionContainer extends React.Component<IStateFromProps> {
  public render() {
    if (this.props.user.token) {
      return (
        <Card elevation={Elevation.ONE}>
          <div className="user">
            <h3 className="bp3-heading">{this.props.user.name}</h3>
            <h6 className="bp3-heading">Saldo: {this.props.user.balance}</h6>
          </div>
        </Card>
      );
    }

    return <Login />;
  }
}

export const NavbarUserSection = connect<IStateFromProps, {}, {}, RootState>(
  (state: RootState) => ({ user: state.auth }),
)(NavbarUserSectionContainer);
