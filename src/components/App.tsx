import * as React from 'react';
import { ActionType } from 'typesafe-actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { RootState } from '../reducers/root-reducer';
import { User } from '../models/user';
import * as auth from '../actions/auth'

interface StateFromProps extends User {}

interface DispatchFromProps {
    login: (username: string, password: string) => void;
    logout: () => void;
}

interface Props extends StateFromProps, DispatchFromProps {}

const mapStateToProps = (state: RootState): StateFromProps => ({
  username: state.auth.username
})

const mapDispatchToProps = (
  dispatch: Dispatch<ActionType<typeof auth>>
): DispatchFromProps => ({
  login: (username: string, password: string) => dispatch(auth.login(username, password)),
  logout: () => dispatch(auth.logout())
})

class AppComponent extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
    }

    login() {
        this.props.login("Username", "Password");
    }

    logout() {
        this.props.logout();
    }

    render() {
        return (
            <div>
                <h1>{this.props.username}</h1>
                <button onClick={this.login}>Login</button>
                <button onClick={this.logout}>Logout</button>
            </div>
        );
    }
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
