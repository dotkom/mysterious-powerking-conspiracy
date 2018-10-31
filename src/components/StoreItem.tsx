import { Button, Card, Elevation } from "@blueprintjs/core";
import * as storeA from "actions/store";
import { Item } from "components/Item";
import { IItem } from "models/item";
import { IUser } from "models/user";
import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "reducers/root-reducer";
import { Dispatch } from "redux";

interface IStateFromProps {
    user: IUser;
}
interface IDispatchFromProps {
    addToBasket: (id: number) => void;
}

const mapDispatchToProps = (
    dispatch: Dispatch<storeA.StoreAction>,
): IDispatchFromProps => ({
    addToBasket: (id: number) => dispatch(storeA.addToBasket(id)),
});

interface IProps extends IDispatchFromProps, IItem, IStateFromProps {}

class StoreItemContainer extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);

        this.addToCart = this.addToCart.bind(this);
    }

    public render() {
        return (
            <Card
                elevation={this.props.user.id ? Elevation.TWO : 0}
                onClick={this.addToCart}
                className="store-item"
                style={this.props.user.id ? {} : { opacity: 0.5 }}
            >
                <img src={this.props.imageURL || "https://placehold.it/200x200"} alt="Placeholder image"/>
                <Item {...this.props} />
            </Card>
        );
    }

    private addToCart() {
        if (this.props.user.id) {
            this.props.addToBasket(this.props.id);
        }
    }
}

export const StoreItem = connect<IStateFromProps, IDispatchFromProps, IItem, RootState>(
    ({ auth }) => ({ user: auth }),
    mapDispatchToProps,
)(StoreItemContainer);
