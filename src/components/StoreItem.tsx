import * as storeActions from "actions/store";
import { Item } from "components/Item";
import { IItem } from "models/item";
import * as React from "react";
import { connect } from "react-redux";
import { IRootState } from "reducers/root-reducer";
import { Dispatch } from "redux";
import { ActionType } from "typesafe-actions";

interface IDispatchFromProps {
    addToBasket: (id: number) => void;
}

const mapDispatchToProps = (
    dispatch: Dispatch<ActionType<typeof storeActions>>,
): IDispatchFromProps => ({
    addToBasket: (id: number) => dispatch(storeActions.addToBasket(id)),
});

interface IProps extends IDispatchFromProps, IItem {}

class StoreItemContainer extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);

        this.addToCart = this.addToCart.bind(this);
    }

    public render() {
        return (
            <div>
                <Item {...this.props} />
                <button onClick={this.addToCart}>Legg til i handlekurven</button>
            </div>
        );
    }

    private addToCart() {
        this.props.addToBasket(this.props.id);
    }
}

export const StoreItem = connect<{}, IDispatchFromProps, IItem, IRootState>(
    null,
    mapDispatchToProps,
)(StoreItemContainer);
