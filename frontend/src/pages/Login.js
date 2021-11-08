import React, { useState } from 'react';
import  { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [blankUsername, setBlankUsername] = useState(false)
    const [blankPassword, setBlankPassword] = useState(false)
    const [badCredentials, setBadCredentials] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault();
        setBlankUsername(false);
        setBlankPassword(false);
        setBadCredentials(false)
        if (username === '' || password === '') {
            if (username === '') {
                setBlankUsername(true)
            }
            if (password === '') {
                setBlankPassword(true)
            } 
        } else {
            let loginData = {
                username,
                password,
            };
            try {
                let res = await axios.post('/api/token/', loginData);
                let resData = res.data;
                console.log(resData)
                setUsername('');
                setPassword('');
            } catch(error) {
                let status = error.response.status;
                if (status === 401) {
                    setBadCredentials(true)
                }
            };
        };
    };

    return (
        <div className='login'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input onChange={(e) => setUsername(e.target.value)} type='text' placeholder="Nom d'utilisateur" value={username}/>
                {blankUsername && <p>Veuillez entrer un nom d'utilisateur.</p>}
                <input onChange={(e) => setPassword(e.target.value)}type='text' placeholder="Mot de passe" value={password}/>
                {blankPassword && <p>Veuillez entrer un mot de passe.</p>}
                {badCredentials && <p>Ces identifiants sont incorrects.</p>}
                <input type='submit' value="Se connecter"/>
            </form>
            <Link className={'nav-link'} to ="/register">
                Register
            </Link>
        </div>
    );
};

export default Login;