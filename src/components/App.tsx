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
    login: (username: string, password: string) => void;
    logout: () => void;
}

interface IProps extends IUser, IDispatchFromProps {}

const mapStateToProps = (state: IRootState): IUser => ({
  username: state.auth.username,
});

const mapDispatchToProps = (
  dispatch: Dispatch<ActionType<typeof auth>>,
): IDispatchFromProps => ({
  login: (username: string, password: string) => dispatch(auth.login(username, password)),
  logout: () => dispatch(auth.logout()),
});

class AppComponent extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    public render() {
        if (isLoggedIn()) {
            return (
                <div>
                    <h1>{this.props.username}</h1>
                    <button onClick={this.login}>Login</button>
                    <button onClick={this.logout}>Logout</button>
                </div>
            );
        }

        return (
            <Login />
        );
    }

    private login() {
        this.props.login("Username", "Password");
    }

    private logout() {
        this.props.logout();
    }
}

export const App = connect<IUser, IDispatchFromProps, {}, IRootState>(
    mapStateToProps,
    mapDispatchToProps,
)(AppComponent);
