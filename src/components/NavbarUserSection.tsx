import { Tag } from "@blueprintjs/core";
import { IUser } from "models/user";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "reducers/root-reducer";
import Portrait from "../assets/portrait.jpg";
import { Login } from "./Login";

interface IStateFromProps {
  user: IUser;
}

class NavbarUserSectionContainer extends React.Component<IStateFromProps> {
  public render() {
    if (this.props.user.token) {
      return (
        <div className="userSection">
          <img src={Portrait} alt="Portrait of user" className="user-portrait" />
          <div className="user">
            <h2 className="bp3-heading">{this.props.user.name}</h2>
            <Tag large icon="bank-account">
              <b>{this.props.user.balance}kr</b>
            </Tag>
          </div>
        </div>
      );
    }

    return <Login />;
  }
}

export const NavbarUserSection = connect<IStateFromProps, {}, {}, RootState>(
  (state: RootState) => ({ user: state.auth }),
)(NavbarUserSectionContainer);
