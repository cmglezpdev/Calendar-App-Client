
const INITIAL_STATE = {
    checking: true,
    // uid: null,
    // name: null
}


export const authReducer = (state = INITIAL_STATE, action) => {

    switch (action.payload) {
        case "value":

            break;
    
        default:
            return state;
    }

}
