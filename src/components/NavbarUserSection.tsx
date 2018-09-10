import { Button } from "@blueprintjs/core";
import * as authA from "actions/auth";
import { isLoggedIn } from "helpers/auth";
import { IUser } from "models/user";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "reducers/root-reducer";
import { Dispatch } from "redux";
import { Login } from "./Login";

interface IStateFromProps {
  user: IUser;
}

interface IDispatchFromProps {
  logout: () => void;
}

interface IProps extends IStateFromProps, IDispatchFromProps {}

class NavbarUserSectionContainer extends React.Component<IProps> {
  public render() {
    if (isLoggedIn(this.props.user)) {
      return (
        <div className="user">
          <h3 className="bp3-heading">{this.props.user.name}</h3>
          <h6 className="bp3-heading">Saldo: {this.props.user.balance}</h6>
          <Button intent="danger" onClick={this.props.logout}>Logg ut</Button>
        </div>
      );
    }

    return <Login />;
  }
}

export const NavbarUserSection = connect<IStateFromProps, IDispatchFromProps, {}, RootState>(
  (state: RootState) => ({ user: state.auth }),
  (dispatch: Dispatch<authA.AuthAction>): IDispatchFromProps => ({
    logout: () => dispatch(authA.logout()),
  }),
)(NavbarUserSectionContainer);
