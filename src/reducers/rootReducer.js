import { combineReducers } from "redux";
import { uiReducer } from './';
import { authReducer } from "./";
import { calendarReducer } from "./";


export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer
})