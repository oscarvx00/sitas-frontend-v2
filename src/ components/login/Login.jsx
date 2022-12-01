import styles from './Login.module.css'
import {checkUserLogged} from '../../services/login.service'

const REACT_APP_BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT

export function Login() {

    function loginWithProvider(providerName){
        window.open(REACT_APP_BACKEND_ENDPOINT + `/oauth2/authorization/${providerName}`, "_self")
    }


    return (
        <div className={`container ${styles.container}`}>
            <div className={styles.login_container}>
                <h1>Sitas</h1>
                <div className={styles.login_container_buttons}>
                    <div className={`${styles.login_button} ${styles.google}`} onClick={() => loginWithProvider('google')}>
                        <img src="/imgs/logoGoogle.png" alt="logo google" />
                        <span>Login with Google</span>
                        <div></div>
                    </div>
                    <div className={`${styles.login_button} ${styles.github}`} onClick={() => loginWithProvider('github')}>
                        <img src="/imgs/logoGithub.png" alt="logo github" />
                        <span>Login with Github</span>
                        <div></div>
                    </div>
                    <div className={`${styles.login_button} ${styles.discord}`} onClick={() => loginWithProvider('discord')}>
                        <img src="/imgs/logoDiscord.png" alt="logo discord" />
                        <span>Login with Discord</span>
                        <div></div>
                    </div>
                </div >
            </div >
        </div >
    )

}