import { Navbar } from "components/Navbar";
import { Store } from "components/Store";
import { IUser } from "models/user";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "reducers/root-reducer";

interface IStateFromProps {
    user: IUser;
}

const mapStateToProps = (state: RootState): IStateFromProps => ({ user: state.auth });

class AppComponent extends React.Component<IStateFromProps> {
    public render() {
        return (
            <div className="container">
                <Navbar />
                <Store />
            </div>
        );
    }
}

export const App = connect<IStateFromProps, {}, {}, RootState>(
    mapStateToProps,
)(AppComponent);
