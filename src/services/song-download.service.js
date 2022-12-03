import axios from 'axios'


const REACT_APP_BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT

export async function getSongDownloads(){
    const response =  await axios.get(
        REACT_APP_BACKEND_ENDPOINT + '/download',
        {
            withCredentials: true
        }
    )
    return response.data
}

export async function downloadSong(downloadId) {
    const response = await axios.get(
        REACT_APP_BACKEND_ENDPOINT + `/download/${downloadId}`,
        {
            withCredentials: true
        }
    )
    console.log(response)
    return response.data.val
}