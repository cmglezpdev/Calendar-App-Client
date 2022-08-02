import moment from "moment";
import { types } from "../types";


const INITIAL_STATE = {
    events: [
        {
            title: 'Boss Brithday',
            start: moment().toDate(),
            end: moment().add(2, 'hours').toDate(),
            bgcolor: '#fafafa',
            notes: 'A big day for boss',
            user: {
            _id: '5c9d8f8f8f8f8f8f8f8f8f8',
            name: 'Carlos'
            }
        }
    ],
    activeEvent: null
};

export const calendarReducer = ( state = INITIAL_STATE, action ) => {

    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        
        case types.eventAddNew:
            return {
                ...state,
                events: [ ...state.events, action.payload ]
            }

        default:
            return state;
    }

}