const BASE_URL = process.env.REACT_APP_API_URL;


const fetchWithoutToken = ( endpoint, data, method = '' ) => {
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

export {
    fetchWithoutToken
}