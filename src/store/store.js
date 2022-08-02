import { applyMiddleware, compose, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";

import { rootReducer } from '../reducers';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)