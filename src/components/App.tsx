import * as authA from "actions/auth";
import { Login } from "components/Login";
import { Navbar } from "components/Navbar";
import { Store } from "components/Store";
import { IUser } from "models/user";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "reducers/root-reducer";
import { Dispatch } from "redux";

interface IStateFromProps {
    user: IUser;
}

interface IDispatchFromProps {
    logout: () => void;
}

interface IProps extends IStateFromProps, IDispatchFromProps {}

const mapStateToProps = (state: RootState): IStateFromProps => ({ user: state.auth });

const mapDispatchToProps = (
  dispatch: Dispatch<authA.AuthAction>,
): IDispatchFromProps => ({
  logout: () => dispatch(authA.logout()),
});

class AppComponent extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    public render() {
        return (
            <div className="container">
                <Navbar />
                <Store />
            </div>
        );
    }

    private logout() {
        this.props.logout();
    }
}

export const App = connect<IStateFromProps, IDispatchFromProps, {}, RootState>(
    mapStateToProps,
    mapDispatchToProps,
)(AppComponent);
