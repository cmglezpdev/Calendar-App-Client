import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types";


export const eventStartAddNew = ( event ) => {
    return async ( dispatch, getState ) => {
        
        const { uid, name } = getState().auth;

        try {
            
            const resp = await fetchWithToken('events', event, 'POST');
            const body = await resp.json();
    
            if( body.ok ) {
            
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name: name
                }
                console.log(event)
                dispatch( eventAddNew(event) );
            }
        
        } catch (error) {
            console.log(error)

        }

    }
}

const eventAddNew = ( event ) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventSetActive = ( event ) => ({
    type: types.eventSetActive,
    payload: event
});


export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent   
})

export const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
})

export const eventDeleted = () => ({
    type: types.eventDeleted,
})


export const eventStartLoading = () => {

    return async ( dispatch ) => {

        try {
            
            const resp = await fetchWithToken('events');
            const body = await resp.json();

            dispatch( eventLoaded(body.events) );

        } catch (error) {
            console.log(error)
        }

    }
}

const eventLoaded = ( events ) => ({
    type: types.eventLoaded,
    payload: events
})  