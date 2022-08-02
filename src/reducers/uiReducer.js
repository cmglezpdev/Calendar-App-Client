import { types } from "../types";

const INITIAL_STATE = {
    modalOpen: false
}


export const uiReducer = ( state = INITIAL_STATE, action ) => {

    switch( action.type ) {
        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true
            }

        default:
            return state;
    }

}