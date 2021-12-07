import React, {useState} from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import useAxios from "../utils/useAxios";

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

const PlayerUpdateForm = ( {player, setUpdated, setModalStatus} ) => {
    const { register, handleSubmit, formState: { errors, isSubmitting} } = useForm({
        defaultValues: {
            username: player.username,
            last_name: player.last_name,
            first_name: player.first_name
        },
        resolver: yupResolver(schema)
    });
    const axios = useAxios()
    const [uniqueError, setUniqueError] = useState(false)

    const putData = async (data) => {
        console.log(data)
        try {
            await axios.put(`/api/players/${player.number}/`, data)
            setUniqueError(false)
            setUpdated(true)
            setModalStatus(false)
        } catch (error) {
            console.log(error)
            if (error.response.status === 400) {
                setUniqueError(true)
            }
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
                    onClick={handleSubmit(putData)}
                    type='submit'
                    value="Modifier"
                />
            </form>
        </div>
    );
};

export default PlayerUpdateForm;