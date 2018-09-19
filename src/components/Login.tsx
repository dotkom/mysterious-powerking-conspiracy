import * as authA from "actions/auth";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "reducers/root-reducer";
import { ThunkDispatch } from "redux-thunk";

import {
    Card,
    Colors,
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

    /**
     * TODO:
     * This is where you want to add the input to a buffer (the RFID) and dispatch on
     * enter. You also want to clear it regularly just in case.
     */

    private keyListener(e: KeyboardEvent) {
        if (e.keyCode === 13) {
            this.props.signIn("phoney");
        }
    }
}

export const Login = connect<{}, IDispatchFromProps, {}, RootState>(null, mapDispatchToProps)(LoginComponent);
