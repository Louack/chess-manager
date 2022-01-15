import React, { useState } from 'react';
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from '../utils/useAxios';
import { useNavigate } from "react-router-dom";
import * as yup from "yup";


const schema = yup.object().shape({
    name: yup
        .string()
        .required("Nom de tournoi requis."),
    tournament_date: yup
        .date(),
    players_list: yup
        .array()
        .max(8, 'La list ne peut excéder 8 joueurs.')
        .of(yup.object().shape({
            label: yup.string().required(),
            value: yup.string().required()
        })).required()
});

const TournamentCreationForm = ({ playersOptions }) => {
    const { register, handleSubmit, control, formState: { errors, isSubmitting} } = useForm({
        defaultValues: {
            tournament_date: new Date().toISOString(),
            players_list: []
        },
        resolver: yupResolver(schema)
    });
    const [lockedError, setLockedError] = useState('')
    const axios = useAxios()
    const navigate = useNavigate();

    const submitWithoutLocking = async (data) => {
        let locked = false
        await postData(data, locked)
    }

    const submitWithLocking = async (data) => {
        if (data.players_list.length !== 8) {
            return setLockedError('8 joueurs sont requis pour vérouiller le tournoi.')
        } else {
            let locked = true
            await postData(data, locked)
        }
    }

    const getCleanedData = (data, locked) => {
        let cleanedData = {}
        cleanedData.tournament_date = data.tournament_date.toISOString().split('T')[0]
        cleanedData.name = data.name
        cleanedData.players_list = []
        data.players_list.map(player => {
            return cleanedData.players_list.push(player.value)
        })
        cleanedData.locked = locked
        return cleanedData
    }

    const postData = async (data, locked) => {
        let cleanedData = getCleanedData(data, locked)
        let response = await axios.post('/api/tournaments/', cleanedData)
        navigate(`/tournaments/${response.data.number}/`)
    }

    return (

        <form>
            <div className='input-set'>
                <span className='input-name'>Nom :</span>
                <input
                    type='text'
                    name='name'
                    {...register('name')}
                />
                <span className='input-error'>{errors.name?.message}</span>
            </div>

            <div className='input-set'>
                <span className='input-name'>Date :</span>
                <input
                    type='date'
                    name='tournament_date'
                    {...register('tournament_date')}
                />
                <span className='input-error'>{errors.tournament_date?.message}</span>
            </div>

            <div className='input-set'>
                <span className='input-name'>Joueurs :</span>
                <Controller
                    name="players_list"
                    control={control}
                    render={({ field:{ onChange, value }}) => (
                <Select
                    value={value}
                    onChange={onChange}
                    options={playersOptions}
                    isMulti
                />
                        )}
                    />
                <span className='input-error'>{errors.players_list?.message}</span>
            </div>

            <div className='submit-set'>
                <div className='multi-submit'>
                    <input
                        className='green-btn'
                        disabled={isSubmitting}
                        onClick={handleSubmit(submitWithoutLocking)}
                        type='submit'
                        value="Créer"
                    />
                    <input
                        className='green-btn'
                        disabled={isSubmitting}
                        onClick={handleSubmit(submitWithLocking)}
                        type='submit'
                        value="Créer et vérouiller"
                    />
                </div>
                {lockedError && <span className='input-error'>{lockedError}</span>}
            </div>
        </form>
        );
};

export default TournamentCreationForm;