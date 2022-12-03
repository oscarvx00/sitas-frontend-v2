import styles from './SongDownload.module.css'
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { getSongDownloads, downloadSong } from '../../services/song-download.service'

export function SongDownload() {

    const [data, setData] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        async function initSongDownloads() {
            try {
                console.log(await getSongDownloads())
                setData(await getSongDownloads())
            } catch (ex){
                //console.error(ex)
            }
        }

        initSongDownloads()
    },  [])

    function goToSearchClicked() {
        navigate('/request')
    }

    async function downloadSongClicked(downloadId) {
        const downloadUrl = await downloadSong(downloadId)
        window.open(downloadUrl, '_blank')
    }


    return (
        <div className="container">
            <div className={styles.top_nav} onClick={goToSearchClicked}>
                <p>GO TO SEARCH</p>
            </div>
            <div className={styles.list_container}>
                {data.map((element, index) => (<div key={`data-${index}`} className={styles.song_list_item_container} data-testid="download_song_item">
                    <div className={styles.song_list_item}>
                        <p>{element.name}</p>
                    </div>
                    {element.ready ?
                        <div className={styles.song_list_item_download_ready} onClick={() => downloadSongClicked(element.downloadId)} data-testid="download_song_enabled">
                            DOWNLOAD
                        </div> :
                        <div className={styles.song_list_item_download_notready} data-testid="download_song_disabled">
                            DOWNLOAD
                        </div>
                    }
                </div>))}
            </div>
        </div>
    )

}