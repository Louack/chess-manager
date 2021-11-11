import React, { useState, useContext} from 'react';
import  { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [blankUsername, setBlankUsername] = useState(false)
    const [blankPassword, setBlankPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    let {getAuthTokens} = useContext(AuthContext)

    const handleLogin = async (e) => {
        e.preventDefault();
        setBlankUsername(false);
        setBlankPassword(false);
        setErrorMessage('')
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
                getAuthTokens(res.data)
            } catch(error) {
                let status = error.response.status;
                if (status === 401) {
                    setErrorMessage('Ces identifiants sont incorrects.')
                } else if (status === 429) {
                    setErrorMessage("Trop d'essais.")
                } else if (status === 500) {
                    setErrorMessage("Erreur serveur.")
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
                <input onChange={(e) => setPassword(e.target.value)}type='password' placeholder="Mot de passe" value={password}/>
                {blankPassword && <p>Veuillez entrer un mot de passe.</p>}
                {errorMessage && <p>{errorMessage}</p>}
                <input type='submit' value="Se connecter"/>
            </form>
            <Link className={'nav-link'} to ="/register">
                Register
            </Link>
        </div>
    );
};

export default Login;