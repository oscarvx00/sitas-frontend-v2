import './login-styles.css'


export function Login() {

    function loginWithProvider(providerName){

    }


    return (
        <div className="container">
            <div className="login-container">
                <h1>Sitas</h1>
                <div class="login-container-buttons">
                    <div class="login-button google" onClick={loginWithProvider('google')}>
                        <img src="/imgs/logoGoogle.png" alt="logo google" />
                        <span>Login with Google</span>
                        <div></div>
                    </div>
                    <div class="login-button github" onClick={loginWithProvider('github')}>
                        <img src="/imgs/logoGithub.png" alt="logo github" />
                        <span>Login with Github</span>
                        <div></div>
                    </div>
                    <div class="login-button discord" onClick={loginWithProvider('discord')}>
                        <img src="/imgs/logoDiscord.png" alt="logo discord" />
                        <span>Login with Discord</span>
                        <div></div>
                    </div>
                </div >
            </div >
        </div >
    )

}