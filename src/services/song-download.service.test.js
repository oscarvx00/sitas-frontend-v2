const functions = require('./song-download.service')

const axios = require('axios')


const TEST_SONG_DOWNLOADS_DATA = [
    { name: "dasd", downloadId: "90db2112-d673-4d7b-9b69-791ab2b96cc9", ready: false },
    { name: "oliver heldens posidon", downloadId: "0838039b-c81e-4c7a-bd01-d4327d7745d4", ready: true }
]

jest.mock('axios')


describe('Song download service', () => {
    test('getSongDownloads', async () => {
        axios.get.mockImplementation(() => Promise.resolve(
            {
                data: TEST_SONG_DOWNLOADS_DATA
            }
        ))
    
        const result = await functions.getSongDownloads()
    
        expect(result).toEqual(TEST_SONG_DOWNLOADS_DATA)
    })
});


