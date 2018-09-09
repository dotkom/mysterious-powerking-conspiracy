import { testItems } from "helpers/store";
import rootReducer, { RootState } from "reducers/root-reducer";
import { createStore, Store } from "redux";

function configureStore(spawnState: RootState) {
    return createStore(rootReducer, spawnState);
}

export const initialState: RootState = {
    auth: {},
    store: {
        basket: [],
        items: testItems,
    },
};

const store: Store<RootState> = configureStore(initialState);

export default store;
