import React, { useState } from 'react';
import  { Link } from "react-router-dom"
import axios from "axios";

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [blankUsername, setBlankUsername] = useState(false)
    const [blankPassword, setBlankPassword] = useState(false)
    const [blankPassword2, setBlankPassword2] = useState(false)
    const [response, setResponse] = useState(false)
    const [responseMessage, setResponseMessage] = useState('')

    const handleRegister = async (e) => {
        e.preventDefault();
        setBlankUsername(false);
        setBlankPassword(false);
        setBlankPassword2(false)
        setResponse(false)
        setResponseMessage(false)
        if (username === '' || password === '' || password2 === '') {
            if (username === '') {
                setBlankUsername(true)
            }
            if (password === '') {
                setBlankPassword(true)
            } ;
            if (password2 === '') {
                setBlankPassword2(true)
            } ;
        } else {
            let registerData = {
                username,
                password,
                password2
            };
            try {
                let res = await axios.post('/api/register/', registerData);
                let resData = res.data;
                console.log(resData)
                setResponse(true)
                setResponseMessage('Utilisateur créé avec succès !')
                setUsername('');
                setPassword('');
                setPassword2('');
            } catch(error) {
                let response = error.response;
                console.log(response.data)
                if (response.status === 400) {
                    setResponse(true)
                    response.data.username && setResponseMessage("Ce nom d'utilisateur existe déjà");
                    response.data.Password && setResponseMessage("Les mots de passe ne correspondent pas.");
                    response.data.password && setResponseMessage("Le mot de passe est trop court ou trop commun.");
                }
            };
        }
    };

    return (
        <div className='registration'>
            <h1>S'enregistrer</h1>
            <form onSubmit={handleRegister}>
                <input onChange={(e) => setUsername(e.target.value)} type='text' placeholder="Nom d'utilisateur" value={username}/>
                {blankUsername && <p>Veuillez entrer un nom d'utilisateur.</p>}
                <input onChange={(e) => setPassword(e.target.value)}type='password' placeholder="Mot de passe" value={password}/>
                {blankPassword && <p>Veuillez entrer un mot de passe.</p>}
                <input onChange={(e) => setPassword2(e.target.value)}type='password' placeholder="Confirmer le mot de passe" value={password2}/>
                {blankPassword2 && <p>Veuillez confirmer le mot de passe.</p>}
                {response && <p>{responseMessage}</p>}
                <input type='submit' value="Se connecter"/>
            </form>
            <Link className={'nav-link'} to ="/login">
                Back to Login
            </Link>
        </div>
    );
};

export default Registration;