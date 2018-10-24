import * as authA from "actions/auth";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "reducers/root-reducer";
import { ThunkDispatch } from "redux-thunk";

import {
    Card,
    Elevation,
} from "@blueprintjs/core";

interface IDispatchFromProps {
    signIn: (rfid: string) => void;
}

const mapDispatchToProps = (
    dispatch: ThunkDispatch<RootState, void, authA.AuthAction>,
): IDispatchFromProps => ({
    signIn: (rfid: string) => dispatch(authA.signIn(rfid)),
});

class LoginComponent extends React.Component<IDispatchFromProps> {
    constructor(props: IDispatchFromProps) {
        super(props);

        this.keyListener = this.keyListener.bind(this);
    }

    public render() {
        return (
            <Card elevation={Elevation.ONE} className="login">
                <p>Vennligst <em>beep</em> adgangskortet ditt for å logge inn.</p>
            </Card>
        );
    }

    public componentDidMount() {
        window.addEventListener("keydown", this.keyListener);
    }

    public componentWillUnmount() {
        window.removeEventListener("keydown", this.keyListener);
    }

    private keyListener(e: KeyboardEvent) {
        if (e.keyCode === 13) {
            this.props.signIn("");
        }
    }
}

export const Login = connect<{}, IDispatchFromProps, {}, RootState>(null, mapDispatchToProps)(LoginComponent);
