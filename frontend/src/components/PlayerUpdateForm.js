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
                <div className='input-set'>
                    <span className='input-name'>Pseudo :</span>
                    <input
                        type='text'
                        name='username'
                        {...register('username')}
                    />
                    <span className='input-error'>{errors.username?.message}</span>
                </div>
                <div className='input-set'></div>
                    <span className='input-name'>Nom :</span>
                    <input
                        type='text'
                        name='last_name'
                        {...register('last_name')}
                    />
                    <span className='input-error'>{errors.last_name?.message}</span>
                
                <div className='input-set'></div>
                    <span className='input-name'>Prénom :</span>
                    <input
                        type='text'
                        name='first_name'
                        placeholder="Prénom du joueur"
                        {...register('first_name')}
                    />
                    <span className='input-error'>{errors.first_name?.message}</span>

                <div className='submit-set'>
                    <input
                        disabled={isSubmitting}
                        onClick={handleSubmit(putData)}
                        type='submit'
                        value="Modifier"
                    />
                    {uniqueError && <span className='input-error'>Ce pseudo est déjà utilisé par un de vos joueurs</span>}
                </div>
            </form>
        </div>
    );
};

export default PlayerUpdateForm;