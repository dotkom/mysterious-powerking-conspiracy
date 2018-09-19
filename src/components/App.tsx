import * as authA from "actions/auth";
import { Navbar } from "components/Navbar";
import { Store } from "components/Store";
import { IUser } from "models/user";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "reducers/root-reducer";
import { ThunkDispatch } from "redux-thunk";

interface IStateFromProps {
    user: IUser;
}

const mapStateToProps = (state: RootState): IStateFromProps => ({ user: state.auth });

interface IDispatchFromProps {
    authenticate: (clientId: string, clientSecret: string) => void;
}

const mapDispatchToProps = (
    dispatch: ThunkDispatch<RootState, void, authA.AuthAction>,
): IDispatchFromProps => ({
    authenticate: (clientId: string, clientSecret: string) => dispatch(authA.authenticate(clientId, clientSecret)),
});

interface IProps extends IStateFromProps, IDispatchFromProps {}

class AppComponent extends React.Component<IProps> {
    public componentDidMount() {
        this.props.authenticate(
            "",
            "",
        );
    }

    public render() {
        return (
            <div className="container">
                <Navbar />
                <Store />
            </div>
        );
    }
}

export const App = connect<IStateFromProps, IDispatchFromProps, {}, RootState>(
    mapStateToProps,
    mapDispatchToProps,
)(AppComponent);
