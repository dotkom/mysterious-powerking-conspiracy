import * as React from "react";
import { connect } from "react-redux";

class LoginComponent extends React.Component<{}> {
    private username = React.createRef<HTMLInputElement>();
    private password = React.createRef<HTMLInputElement>();

    constructor(props: {}) {
        super(props);
    }

    public render() {
        return (
            <div>
                <form onSubmit={() => { alert(this.username.current!.value + " -> " + this.password.current!.value); }}>
                    <input type="text" ref={this.username} placeholder="Username" />
                    <input type="password" ref={this.password} placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export const Login = connect()(LoginComponent);
