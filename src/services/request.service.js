import axios from 'axios'


const REACT_APP_BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT


export async function sendRequest(songNames) {
    await axios.post(REACT_APP_BACKEND_ENDPOINT + '/request',
    songNames,
    {
        withCredentials : true
    })
}

