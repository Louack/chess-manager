import React, {useContext, useState} from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthContext from '../context/AuthContext';
import * as yup from "yup";
import axios from "axios";

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

    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <div className='input-set'>
                <span className='input-name'>Nom d'utilisateur :</span>
                <input
                    type='text'
                    name='username'
                    {...register('username')}
                />
                <span className='input-error'>{errors.username?.message}</span>
            </div>

            <div className='input-set'>
                <span className='input-name'>Mot de passe :</span>
                <input
                    type='password'
                    name='password'
                    {...register('password')}
                />
                <span className='input-error'>{errors.password?.message}</span>
            </div>

            <div className='submit-set'>
                <input
                    className='white-btn'
                    disabled={isSubmitting}
                    type='submit'
                    value="Se connecter"
                />
                {errorMessage && <span className='input-error'>{errorMessage}</span>}
            </div>
        </form>
    );
};

export default Login;