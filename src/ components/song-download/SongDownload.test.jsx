import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { act } from "react-test-renderer"
import { SongDownload } from "./SongDownload"

import { getSongDownloads, downloadSong } from '../../services/song-download.service'


const TEST_SONG_DOWNLOADS_DATA = [
    { name: "dasd", downloadId: "90db2112-d673-4d7b-9b69-791ab2b96cc9", ready: false },
    { name: "oliver heldens posidon", downloadId: "0838039b-c81e-4c7a-bd01-d4327d7745d4", ready: true }
]

const TEST_SONG_DOWNLOAD_URL = {
    val : 'httop://downloadurl'
}

const mockedNavigate = jest.fn() 

const mockedGetSongDownloads = () => (TEST_SONG_DOWNLOADS_DATA)
const mockedDownloadSong = (downloadId) => mockedDownloadSong

jest.mock('react-router-dom', () => ({
    useNavigate: () => mockedNavigate
}))
jest.mock('../../services/song-download.service', () => ({
    getSongDownloads : jest.fn(),
    downloadSong : jest.fn()
}))


describe('SongDownload component', () => {
    beforeEach( () => {

        getSongDownloads.mockImplementation(mockedGetSongDownloads)
        downloadSong.mockImplementation(mockedDownloadSong)
    
        act(() => {
            render(<SongDownload/>)
        })
    })
    
    test('goToSearchClicked', () => {
        userEvent.click(screen.getByText("GO TO SEARCH"))
    
        expect(mockedNavigate).toHaveBeenCalledWith("/request")
    })
    
    test('downloadSongClicked', async () => {
    
        window.open = () => {} 
        
        await waitFor(() => expect(screen.getAllByTestId("download_song_enabled").length).toBe(1))
        
        act(() => {
            userEvent.click(screen.getByTestId("download_song_enabled"))
            expect(downloadSong).toHaveBeenCalledWith('0838039b-c81e-4c7a-bd01-d4327d7745d4')
        })
        
    
    })
});



