import * as storeA from "actions/store";
import { retrieveStoreItems } from "helpers/store";
import rootReducer, { RootAction, RootState } from "reducers/root-reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

import {
    applyMiddleware,
    compose,
    createStore,
    Store,
} from "redux";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configureStore(spawnState: RootState) {
    const configuredStore = createStore<RootState, RootAction, {}, {}>(
        rootReducer,
        spawnState,
        composeEnhancers(
            applyMiddleware(thunk, logger),
        ),
    );

    return configuredStore;
}

export const initialState: RootState = {
    auth: {},
    store: {
        basket: [],
        items: [],
        meta: {
            purchasing: false,
        },
    },
};

const store: Store<RootState> = configureStore(initialState);

// Add items to store
retrieveStoreItems().then((items) => items.forEach((item) => store.dispatch(storeA.addItem(item))));

export default store;
