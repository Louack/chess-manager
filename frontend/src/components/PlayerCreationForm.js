import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from '../utils/useAxios';
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object().shape({
    username: yup
        .string()
        .required("Pseudo requis."),
    last_name: yup
        .string()
        .required("Nom requis."),
    first_name: yup
        .string()
        .required("Prénom requis.")
});

const PlayerCreationForm = ( {setCreated} ) => {
    const { register, handleSubmit, formState: { errors, isSubmitting} } = useForm({
        resolver: yupResolver(schema)
    });
    const axios = useAxios()
    const navigate = useNavigate();
    const [uniqueError, setUniqueError] = useState(false)

    const postData = async (data) => {
        console.log(data)
        try {
            let response = await axios.post('/api/players/', data)
            navigate(`/players/${response.data.number}/`)
            setUniqueError(false)
            setCreated(true)
        } catch (error) {
            if (error.response.status === 400) setUniqueError(true)
        }
    }

    return (
        <div>
            <form>
                <input
                    type='text'
                    name='username'
                    placeholder="Pseudo du joueur"
                    {...register('username')}
                />
                <span>{errors.username?.message}</span>
                {uniqueError && <span>Ce pseudo est déjà utilisé par un de vos joueurs</span>}
                <input
                    type='text'
                    name='last_name'
                    placeholder="Nom du joueur"
                    {...register('last_name')}
                />
                <span>{errors.last_name?.message}</span>
                <input
                    type='text'
                    name='first_name'
                    placeholder="Prénom du joueur"
                    {...register('first_name')}
                />
                <span>{errors.first_name?.message}</span>
                <input
                    disabled={isSubmitting}
                    onClick={handleSubmit(postData)}
                    type='submit'
                    value="Créer"
                />
            </form>
        </div>
    );
};

export default PlayerCreationForm;