import { combineReducers } from "redux";
import { uiReducer } from './';
import { calendarReducer } from "./calendarReducer";


export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer
})