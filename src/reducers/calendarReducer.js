import { types } from "../types";

// {
//     id: 'wefwefewfwecwef',
//     title: 'Boss Brithday',
//     start: moment().toDate(),
//     end: moment().add(2, 'hours').toDate(),
//     notes: 'A big day for boss',
//     user: {
//     _id: '5c9d8f8f8f8f8f8f8f8f8f8',
//     name: 'Carlos'
//     }
// }

const INITIAL_STATE = {
    events: [],
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

        case types.eventClearActiveEvent:
            return{
                ...state,
                activeEvent: null
            }
            
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                    event => event.id === action.payload.id ? action.payload : event
                )
            }
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter( event => event.id !== state.activeEvent.id ),
                activeEvent: null
            }
        
        case types.eventLoaded:
            return {
                ...state,
                events: [ ...action.payload ]
            }
            
        case types.eventLogout:
            return {
                events: [],
                activeEvent: null
            }

        default:
            return state;
    }

}