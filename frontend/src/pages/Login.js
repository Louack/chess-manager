import React, {useContext, useState} from 'react';
import  { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthContext from '../context/AuthContext';
import * as yup from "yup";
import axios from "axios";
import BasePage from "./BasePage";

const schema = yup.object().shape({
    username: yup.string().required("Nom d'utilisateur requis."),
    password: yup.string().required("Mot de passe requis.")
});

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema),
    });
    const { getAuthTokens } = useContext(AuthContext)

    const handleLogin = async (data) => {
        try {
            let res = await axios.post('/api/token/', data);
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
        }
    };
    const getMainElement = () => {
        return (
            <div className='login'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <input
                        type='text'
                        name='username'
                        placeholder="Nom d'utilisateur"
                        {...register('username')}
                    />
                    <span>{errors.username?.message}</span>
                    <input
                        type='password'
                        name='password'
                        placeholder="Mot de passe"
                        {...register('password')}
                    />
                    <span>{errors.password?.message}</span>
                    <input
                        disabled={isSubmitting}
                        type='submit'
                        value="Se connecter"
                    />
                </form>

                {errorMessage && <span>{errorMessage}</span>}

                <Link className={'nav-link'} to ="/register">
                    Register
                </Link>
            </div>
        )
    }

    let mainElement = getMainElement()

    return (
        <BasePage main={mainElement} />
    );
};

export default Login;