import * as React from "react";
import { connect } from "react-redux";
import { isLoggedIn } from "../helpers/auth";
import { IUser } from "../models/user";
import { RootState } from "../reducers/root-reducer";
import { Login } from "./Login";

interface IStateFromProps {
  user: IUser;
}

class NavbarUserSectionContainer extends React.Component<IStateFromProps> {
  public render() {
    if (isLoggedIn(this.props.user)) {
      return (
        <div className="user">
          <h3 className="bp3-heading">{this.props.user.name}</h3>
          <h6 className="bp3-heading">Saldo: {this.props.user.balance}</h6>
        </div>
      );
    }

    return <Login />;
  }
}

export const NavbarUserSection = connect<IStateFromProps, {}, {}, RootState>(
  (state: RootState) => ({ user: state.auth }),
)(NavbarUserSectionContainer);
