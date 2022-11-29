import './login-styles.css'
import {checkUserLogged} from '../../services/login.service'

const REACT_APP_BACKEND_ENDPOINT = process.env.REACT_APP_BACKEND_ENDPOINT

export function Login() {

    function loginWithProvider(providerName){
        window.open(REACT_APP_BACKEND_ENDPOINT + `/oauth2/authorization/${providerName}`, "_self")
    }


    return (
        <div className="container">
            <div className="login-container">
                <h1>Sitas</h1>
                <div class="login-container-buttons">
                    <div class="login-button google" onClick={() => loginWithProvider('google')}>
                        <img src="/imgs/logoGoogle.png" alt="logo google" />
                        <span>Login with Google</span>
                        <div></div>
                    </div>
                    <div class="login-button github" onClick={() => loginWithProvider('github')}>
                        <img src="/imgs/logoGithub.png" alt="logo github" />
                        <span>Login with Github</span>
                        <div></div>
                    </div>
                    <div class="login-button discord" onClick={() => loginWithProvider('discord')}>
                        <img src="/imgs/logoDiscord.png" alt="logo discord" />
                        <span>Login with Discord</span>
                        <div></div>
                    </div>
                </div >
            </div >
        </div >
    )

}