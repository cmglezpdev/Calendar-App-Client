import { combineReducers } from "redux";
import { uiReducer } from './';


export const rootReducer = combineReducers({
    ui: uiReducer
})