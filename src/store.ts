import { createStore, Store } from 'redux';

import rootReducer, { RootState } from './reducers/root-reducer'

function configureStore(initialState: RootState) {
    return createStore(rootReducer, initialState);
}

const store: Store<RootState> = configureStore({ auth: {} });

export default store;