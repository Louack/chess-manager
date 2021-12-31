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
            <h1>Chess Manager</h1>
            <div className='login-register'>
                <button
                    className={'btn-type-1'}
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
                    className={'btn-type-2'}
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
        </main>
    )
}

export default Home;