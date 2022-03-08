import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";

const schema = yup.object().shape({
    username: yup
        .string()
        .required("Nom d'utilisateur requis."),
    password: yup
        .string()
        .required("Mot de passe requis.")
        .min(8, "Le mot de passe doit contenir au moins 8 caractères."),
    password2: yup
        .string()
        .oneOf([yup.ref("password"), null])
});


/**
 * Registration form to be displayed inside a modal.
 */
const Registration = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting} } = useForm({
        resolver: yupResolver(schema),
    });

    const [errorMessage, setErrorMessage] = useState('')
    const [newUser, setNewUser] = useState('')

    const handleRegister = async (data) => {
        try {
            let response = await axios.post('/api/register/', data);
            reset({})
            setNewUser(response.data.username)
        } catch(error) {
            let response = error.response;
            if (response.status === 400) {
                response.data.username ? 
                    setErrorMessage("Ce nom d'utilisateur est incorrect ou est déjà utilisé.") : 
                    response.data.password ? 
                        setErrorMessage("Ce mot de passe est trop commun.") : 
                        setErrorMessage("Bad request");
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(handleRegister)}>
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

            <div className='input-set'>
                <span className='input-name'>Confirmer le mot de passe :</span>
                <input
                    type='password'
                    name='password2'
                    {...register('password2')}
                />
                {errors.password2 && <span className='input-error'>Les mots de passe ne correspondent pas.</span>}
            </div>
            <div className='submit-set'>
                <input
                    className='white-btn'
                    disabled={isSubmitting}
                    type='submit'
                    value="S'inscrire"
                />
                {errorMessage && <span className='input-error'>{errorMessage}</span>}
                {newUser && <span className='submit-success'>L'utilisateur <b>{newUser}</b> a été créé avec succès !</span>}
            </div>
        </form>
    );
};

export default Registration;