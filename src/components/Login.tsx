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
    private buffer: string[];
    private intervalID: any; /* This is actually a number, or a TimerHandler, but react can't find TimerHandler */
    private intervalHandler: () => void;
    private INTERVAL_CYCLE_DELAY: number;

    constructor(props: IDispatchFromProps) {
        super(props);

        this.keyListener = this.keyListener.bind(this);

        this.INTERVAL_CYCLE_DELAY = 2000;
        this.intervalHandler = () => { this.buffer = []; };

        this.buffer = [];
        this.intervalID = setInterval(this.intervalHandler, this.INTERVAL_CYCLE_DELAY);
    }

    public render() {
        return (
            <Card elevation={Elevation.ONE} className="beep-card">
                <p>Scan student-kortet ditt her.</p>
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
        clearInterval(this.intervalID);

        if (e.keyCode === 13 && /^\d{8,10}$/.test(this.buffer.join(""))) {
            this.props.signIn(this.buffer.join(""));
        } else {
            this.buffer.push(e.key);
        }

        this.intervalID = setInterval(this.intervalHandler, this.INTERVAL_CYCLE_DELAY);
    }
}

export const Login = connect<{}, IDispatchFromProps, {}, RootState>(null, mapDispatchToProps)(LoginComponent);
