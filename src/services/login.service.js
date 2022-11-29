
const REACT_APP_BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT

const axios = require('axios')

export async function checkUserLogged() {
    await axios.get(REACT_APP_BACKEND_ENDPOINT + '/me',
    {
        withCredentials : true
    })
}

