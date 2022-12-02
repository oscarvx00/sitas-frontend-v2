import React, { useState, useEffect } from 'react'
import styles from './Request.module.css'
import { checkUserLogged } from '../../services/login.service'
import { sendRequest } from '../../services/request.service'
import { useNavigate } from "react-router-dom";

export function Request() {

    const [data, setData] = useState([{ name: '' }])
    const [focusOnLastFlag, setFocusOnLastFlag] = useState(false)
    const dataRefArray = React.useRef([])
    const navigate = useNavigate()

    useEffect(() => {

        async function checkUserLoggedC() {
            const userLogged = await checkUserLogged()
            if (!userLogged) {
                //navigate('/login')
            }
        }

        checkUserLoggedC()
    }, [])

    let discardCheckUserLogged = true
    //let focusOnLastFlag = false

    function goToDownloadClicked() {
        navigate('/download')
    }

    function handleKeyDown(event, index) {
        if (event.key == 'Enter') {
            addRow(event, index)
            event.preventDefault()
        }
    }

    function focusOnLast(event) {
        event.preventDefault()
        if (event.key == 'Enter') {
            if(focusOnLastFlag){
                setFocusOnLastFlag(false)
                console.log(dataRefArray)
                dataRefArray[data.length - 1].focus()
            }
        }
        
    }

    function addRow(event, index) {
        const updatedData = [...data]
        updatedData[index].name = event.target.innerText


        if (index === updatedData.length - 1 && updatedData[index].name != '') {
            updatedData.push({
                name: ''
            })
            setFocusOnLastFlag(true)
        }

        setData(updatedData)
        
    }

    function remove(index) {
        const updatedData = [...data]
        updatedData.splice(index,1)
        setData(updatedData)
    }

    async function downloadClicked() {
        if(data.filter(it => it.name && it.name.trim()).length === 0){
            alert("No data")
            return
        }

        try {
            await sendRequest(data.filter(it => it.name).map(it => it.name))
            goToDownloadClicked()
        } catch(ex) {
            console.error(ex)
        }
    }




    return (
        <div className="container">
            <div className={styles.top_nav} onClick={goToDownloadClicked}>
                <p>GO TO MY DOWNLOADS</p>
            </div>
            <div className={styles.modules_container}>
                <div className={styles.module}>
                    <p>YOUTUBE</p>
                </div>
                <div className={styles.module}>
                    <p>SPOTIFY</p>
                </div>
                <div className={`${styles.module} ${styles.soundcloud}`}>
                    <p>SOUNDCLOUD</p>
                </div>
            </div>
            <div className={styles.list_container}>
                {data.map((element, index) => (<div key={index} className={styles.song_list_item}>
                    <p  ref={ref => {dataRefArray.current[index] = ref}} contentEditable="true" onKeyDown={event => handleKeyDown(event, index)} onKeyUp={focusOnLast} onBlur={(event) => addRow(event, index)} suppressContentEditableWarning={true} data-testid="download-request-input">{element.name}</p>
                    <div className={styles.remove_row} onClick={() => remove(index)} data-testid="download-request-delete">X</div>
                </div>))}
            </div>
            <div className={styles.download_button} onClick={downloadClicked}>DOWNLOAD</div>
        </div>
    )

}