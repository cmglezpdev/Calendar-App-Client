import { types } from '../types'


const INITIAL_STATE = {
    checking: true,
    // uid: null,
    // name: null
}


export const authReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case types.authLogin:
            return {
                ...state,
                checking: false,
                ...action.payload
            }
            
        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }

        default:
            return state;
    }

}
