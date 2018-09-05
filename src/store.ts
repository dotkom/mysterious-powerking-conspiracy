import { testItems } from "helpers/store";
import rootReducer, { IRootState } from "reducers/root-reducer";
import { createStore, Store } from "redux";

function configureStore(initialState: IRootState) {
    return createStore(rootReducer, initialState);
}

const store: Store<IRootState> = configureStore({ auth: {}, store: { items: testItems} });

export default store;
