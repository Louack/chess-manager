import React, { useState } from 'react';
import  { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";

const schema = yup.object().shape({
    username: yup.string()
        .required("Nom d'utilisateur requis."),
    password: yup
        .string()
        .required("Mot de passe requis.")
        .min(8, "Le mot de passe doit contenir au moins 8 caractères."),
    password2: yup
        .string()
        .oneOf([yup.ref("password"), null])
});

const Registration = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting} } = useForm({
        resolver: yupResolver(schema),
    });

    const [errorMessage, setErrorMessage] = useState('')

    const handleRegister = async (data) => {
        try {
            await axios.post('/api/register/', data);
        } catch(error) {
            let response = error.response;
            if (response.status === 400) {
                response.data.username && setErrorMessage("Ce nom d'utilisateur existe déjà.");
            }
        }
    }

    return (
        <div className='registration'>
            <h1>S'enregistrer</h1>
            <form onSubmit={handleSubmit(handleRegister)}>
                <input
                    type='text'
                    name='username'
                    placeholder="Nom d'utilisateur"
                    {...register('username')}
                />
                <span>{errors.username?.message}</span>
                {errorMessage && <span>{errorMessage}</span>}

                <input
                    type='password'
                    name='password'
                    placeholder="Mot de passe"
                    {...register('password')}
                />
                <span>{errors.password?.message}</span>

                <input
                    type='password'
                    name='password2'
                    placeholder="Confirmer le mot de passe"
                    {...register('password2')}
                />
                {errors.password2 && <span>Les mots de passe ne correspondent pas.</span>}

                <input
                    disabled={isSubmitting}
                    type='submit'
                    value="Se connecter"
                />
            </form>
            <Link className={'nav-link'} to ="/login">
                Back to Login
            </Link>
        </div>
    );
};

export default Registration;