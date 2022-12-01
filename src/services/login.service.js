import axios from 'axios'


const REACT_APP_BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT


export async function checkUserLogged() {
    try {
        await axios.get(REACT_APP_BACKEND_ENDPOINT + '/me',
        {
            withCredentials : true
        })
        return true
    } catch {
        return false
    }
}

