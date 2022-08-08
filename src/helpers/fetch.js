const BASE_URL = process.env.REACT_APP_API_URL;


const fetchWithoutToken = ( endpoint, data, method = 'GET' ) => {
    const url = `${BASE_URL}/${endpoint}`;
 
    if( method === 'GET' )
        return fetch(url);

    return fetch(url, {
        method,
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

}

const fetchWithToken = ( endpoint, data, method = 'GET' ) => {
    const url = `${BASE_URL}/${endpoint}`;
 
    if( method === 'GET' )
        return fetch(url, {
            method,
            headers: {
                'x-token': localStorage.getItem('token') || ''
            }
        });
        
        return fetch(url, {
        method,
        headers: {
            'Content-type': 'application/json',
            'x-token': localStorage.getItem('token') || ''
        },
        body: JSON.stringify(data)
    })

}


export {
    fetchWithoutToken,
    fetchWithToken
}