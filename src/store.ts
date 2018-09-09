import { purchaseEpic } from "epics/store";
import { testItems } from "helpers/store";
import rootReducer, { RootAction, RootState } from "reducers/root-reducer";
import { applyMiddleware, createStore, Store } from "redux";
import { createEpicMiddleware } from "redux-observable";

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>();

function configureStore(spawnState: RootState) {
    const configuredStore = createStore(
        rootReducer,
        spawnState,
        applyMiddleware(epicMiddleware),
    );

    epicMiddleware.run(purchaseEpic);

    return configuredStore;
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
