import { Basket } from "components/Basket";
import { StoreItem } from "components/StoreItem";
import { IItem } from "models/item";
import { IUser } from "models/user";
import * as React from "react";
import { connect } from "react-redux";
import { IRootState } from "reducers/root-reducer";

interface IStateFromProps {
    user: IUser;
    items: IItem[];
}

class StoreContainer extends React.Component<IStateFromProps> {
    public render() {
        const items = this.props.items.map((item: IItem) => (
            <StoreItem key={item.id} {...item} />
        ));

        return (
            <div>
                {/* TODO: Implement navbar */}
                <div>
                    <pre>
                        Name: {this.props.user.name}<br/>
                        Username: {this.props.user.username}<br/>
                        Balance: {this.props.user.balance}NOK
                    </pre>
                </div>
                <div className="items">
                    {items}
                </div>
                <div className="basket">
                    <Basket />
                </div>
            </div>
        );
    }
}

export const Store = connect<IStateFromProps, {}, {}, IRootState>(
    (state: IRootState): IStateFromProps => ({
        items: state.store.items,
        user: state.auth,
    }),
)(StoreContainer);
