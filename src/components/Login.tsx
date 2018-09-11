import * as authA from "actions/auth";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "reducers/root-reducer";
import { ThunkDispatch } from "redux-thunk";

import {
    Button,
    Card,
    Elevation,
    FormGroup,
} from "@blueprintjs/core";

interface IDispatchFromProps {
    signIn: (username: string, password: string) => void;
}

const mapDispatchToProps = (
    dispatch: ThunkDispatch<RootState, void, authA.AuthAction>,
): IDispatchFromProps => ({
    signIn: (username: string, password: string) => dispatch(authA.signIn(username, password)),
});

class LoginComponent extends React.Component<IDispatchFromProps> {
    private username = React.createRef<HTMLInputElement>();
    private password = React.createRef<HTMLInputElement>();

    constructor(props: IDispatchFromProps) {
        super(props);

        this.login = this.login.bind(this);
    }

    public render() {
        return (
            <Card elevation={Elevation.ONE}>
                <form onSubmit={this.login}>
                    <FormGroup
                        label="Brukernavn"
                        labelFor="username"
                    >
                        <input
                            className="bp3-input"
                            id="username"
                            type="text"
                            ref={this.username}
                            placeholder="Username"
                        />
                    </FormGroup>
                    <FormGroup
                        label="Passord"
                        labelFor="password"
                    >
                        <input
                            className="bp3-input"
                            id="password"
                            type="password"
                            ref={this.password}
                            placeholder="Password"
                        />
                    </FormGroup>
                    <Button intent="primary" type="submit">Login</Button>
                </form>
            </Card>
        );
    }

    private login() {
        this.props.signIn(
            this.username.current!.value,
            this.password.current!.value,
        );
    }
}

export const Login = connect<{}, IDispatchFromProps, {}, RootState>(null, mapDispatchToProps)(LoginComponent);
