import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch"
import { types } from '../types';

export const startLogin = ( email, password ) => {
    return async ( dispatch ) => {

        const response = await fetchWithoutToken('auth', {email, password}, 'POST');
        const body = await response.json();
        
        if( body.ok ) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
        
            dispatch( login({
                uid: body.uid,
                name: body.name
            }) );
        } 
        else {
            console.log(body)
            Swal.fire('Error', body.msg, 'error');
        }
        
    }
}

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
})



export const startRegister = ( user ) => {

    return async (dispatch) => {
        
        const response = await fetchWithoutToken('auth/new', user, 'POST' );
        const body = await response.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
        
            dispatch( login({
                uid: body.uid,
                name: body.name
            }) );
        }
        else {
            console.log(body)
            Swal.fire('Error', body.msg, 'error');
        }
    }
} 


export const startChecking = () => {
    return async (dispatch) => {
        
        const response = await fetchWithToken('auth/renew',{}, 'GET' );
        const body = await response.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            console.log(body)
            dispatch( login({
                uid: body.uid,
                name: body.name
            }) );
        }
        else {
            console.log(body)
            // Swal.fire('Error', body.msg, 'error');
            dispatch( checkingFinish() );
        }
    }
}

const checkingFinish = () => ({
    type: types.authCheckingFinish
})