import React, {useState} from 'react'
import Modal from "../components/Modal";
import Login from "../components/Login";
import Registration from "../components/Registration";

const Home = () => {
    const [loginModalStatus, setLoginModalStatus] = useState(false)
    const [registerModalStatus, setRegisterModalStatus] = useState(false)
    const loginForm = <Login />
    const registerForm = <Registration />

    return (
            <main className='home'>
                <img src="/img/home-chess.jpg" alt="home-chess" />
                <h1>Chess Manager</h1>
                <div className='login-register'>
                    <button
                        className={'login-btn'}
                        onClick={() => {
                            setLoginModalStatus(true)
                        }}
                    >
                        Connexion
                    </button>
                    < Modal
                        modalStatus={loginModalStatus}
                        setModalStatus={setLoginModalStatus}
                        title={"Connexion"}
                        body={loginForm}
                    />
                    <button
                        className={'register-btn'}
                        onClick={() => {
                            setRegisterModalStatus(true)
                        }}
                    >
                        Inscription
                    </button>
                    < Modal
                        modalStatus={registerModalStatus}
                        setModalStatus={setRegisterModalStatus}
                        title={"Inscription"}
                        body={registerForm}
                    />
                </div>
            </main>
    )
}

export default Home;