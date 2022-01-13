import React, {useState} from 'react'
import ModalForm from "../components/ModalForm";
import Login from "../components/Login";
import Registration from "../components/Registration";

const Home = () => {
    const [loginModalStatus, setLoginModalStatus] = useState(false)
    const [registerModalStatus, setRegisterModalStatus] = useState(false)
    const loginForm = <Login />
    const registerForm = <Registration />

    return (
        <main>
            <div className='home'>
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
                    < ModalForm
                    modalStatus={loginModalStatus}
                    setModalStatus={setLoginModalStatus}
                    title={"Connexion"}
                    form={loginForm}
                    />
                    <button
                        className={'register-btn'}
                        onClick={() => {
                            setRegisterModalStatus(true)
                        }}
                    >
                        Inscription
                    </button>
                    < ModalForm
                    modalStatus={registerModalStatus}
                    setModalStatus={setRegisterModalStatus}
                    title={"Inscription"}
                    form={registerForm}
                    />
                </div>
            </div>
        </main>
    )
}

export default Home;