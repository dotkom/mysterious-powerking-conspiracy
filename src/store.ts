import { testItems } from "helpers/store";
import rootReducer, { IRootState } from "reducers/root-reducer";
import { createStore, Store } from "redux";

function configureStore(spawnState: IRootState) {
    return createStore(rootReducer, spawnState);
}

export const initialState: IRootState = {
    auth: {},
    store: {
        basket: [],
        items: testItems,
    },
};

const store: Store<IRootState> = configureStore(initialState);

export default store;
