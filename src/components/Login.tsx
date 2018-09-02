import * as auth from "actions/auth";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

interface IDispatchFromProps {
    login: (username: string, password: string) => void;
}

const mapDispatchToProps = (
    dispatch: Dispatch<ActionType<typeof auth>>,
): IDispatchFromProps => ({
    login: (username: string, password: string) => dispatch(auth.login(username, password)),
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
            <div>
                <form onSubmit={this.login}>
                    <input type="text" ref={this.username} placeholder="Username" />
                    <input type="password" ref={this.password} placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }

    private login() {
        this.props.login(
            this.username.current!.value,
            this.password.current!.value,
        );
    }
}

export const Login = connect(null, mapDispatchToProps)(LoginComponent);
