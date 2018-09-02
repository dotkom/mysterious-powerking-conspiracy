import * as auth from "actions/auth";
import { Login } from "components/Login";
import { isLoggedIn } from "helpers/auth";
import { IUser } from "models/user";
import * as React from "react";
import { connect } from "react-redux";
import { IRootState } from "reducers/root-reducer";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

interface IDispatchFromProps {
    logout: () => void;
}

interface IProps extends IUser, IDispatchFromProps {}

const mapStateToProps = (state: IRootState): IUser => ({
  username: state.auth.username,
});

const mapDispatchToProps = (
  dispatch: Dispatch<ActionType<typeof auth>>,
): IDispatchFromProps => ({
  logout: () => dispatch(auth.logout()),
});

class AppComponent extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    public render() {
        if (isLoggedIn()) {
            return (
                <div>
                    <h1>{this.props.username}</h1>
                    <button onClick={this.logout}>Logout</button>
                </div>
            );
        } else {
          return (
            <Login />
          );
        }
    }

    private logout() {
        this.props.logout();
    }
}

export const App = connect<IUser, IDispatchFromProps, {}, IRootState>(
    mapStateToProps,
    mapDispatchToProps,
)(AppComponent);
