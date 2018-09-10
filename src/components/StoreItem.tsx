import { Button, Card, Elevation } from "@blueprintjs/core";
import * as storeA from "actions/store";
import { Item } from "components/Item";
import { isLoggedIn } from "helpers/auth";
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
                elevation={Elevation.ONE}
                interactive={isLoggedIn(this.props.user)}
                onClick={this.addToCart}
            >
                <Item {...this.props} />
                {
                    isLoggedIn(this.props.user) &&
                    <Button icon="plus">Legg til i handlekurven</Button>
                }
            </Card>
        );
    }

    private addToCart() {
        if (isLoggedIn(this.props.user)) {
            this.props.addToBasket(this.props.id);
        }
    }
}

export const StoreItem = connect<IStateFromProps, IDispatchFromProps, IItem, RootState>(
    ({ auth }) => ({ user: auth }),
    mapDispatchToProps,
)(StoreItemContainer);
