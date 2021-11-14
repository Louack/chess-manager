import React, {useEffect, useState} from 'react';
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from '../utils/useAxios';
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

const TournamentUpdateForm = ({tournament}) => {
    const [playersOptions, setPlayersOptions] = useState([])
    const [nextPage, setNextPage] = useState('')
    const [lockedError, setLockedError] = useState('')
    const [defaultPlayers, setDefaultPlayers] = useState([])
    const axios = useAxios()
    const { register, handleSubmit, control, formState: { errors, isSubmitting} } = useForm({
        defaultValues: {
            name: tournament.name,
            tournament_date: tournament.tournament_date,
        },
        resolver: yupResolver(schema)
    });

    async function getPlayersList (url) {
        try {
            const tempList = playersOptions
            const response = await axios.get(url)
            response.data.results.map(player => {
                return tempList.push({
                    value: player.number,
                    label: player.username
                })
            })
            setPlayersOptions(tempList)

            if (response.data.next != null) {
                setNextPage(response.data.next)
                getDefaultPlayers(tempList)
            } else {
                setNextPage('')
            }

        } catch(error) {
            console.log(error)
        }
    }

    const getDefaultPlayers = (playersTempList) => {
        let tempDefaultPlayers = []
        tournament.players_list.map((defaultPlayer) => {
            playersTempList.map((optionPlayer) => {
                if (defaultPlayer === optionPlayer.value) {
                    return tempDefaultPlayers.push(optionPlayer)
                }
            })
        })
        setDefaultPlayers(tempDefaultPlayers)
    }

    const submitWithoutLocking = async (data) => {
        let locked = false
        await putData(data, locked)
    }

    const submitWithLocking = async (data) => {
        if (data.players_list.length != 8) {
            return setLockedError('8 joueurs sont requis pour vérouiller le tournoi.')
        } else {
            let locked = true
            await putData(data, locked)
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

    const putData = async (data, locked) => {
        let cleanedData = getCleanedData(data, locked)
        await axios.put(`/api/tournaments/${tournament.number}/`, cleanedData)
    }

    useEffect( () => {
        const url = '/api/players/'
        getPlayersList(url)
    }, [])

    useEffect(() => {
        if (nextPage) getPlayersList(nextPage)
    }, [nextPage])

    const select = <Controller
        name="players_list"
        control={control}
        render={({field: {onChange, value}}) => (
            <Select
                defaultValue={defaultPlayers}
                value={value}
                onChange={onChange}
                options={playersOptions}
                isMulti
            />
        )}
    />

    return (
        <form>
            <input
                type='text'
                name='name'
                placeholder="Nom du tournoi"
                {...register('name')}
            />
            <span>{errors.name?.message}</span>

            <input
                type='date'
                name='tournament_date'
                placeholder="Date du tournoi"
                {...register('tournament_date')}
            />
            <span>{errors.tournament_date?.message}</span>
            {defaultPlayers.length && select}
            {!tournament.players_list.length && select}
            <span>{errors.players_list?.message}</span>
            <input
                disabled={isSubmitting}
                onClick={handleSubmit(submitWithoutLocking)}
                type='submit'
                value="Créer"
            />
            <input
                disabled={isSubmitting}
                onClick={handleSubmit(submitWithLocking)}
                type='submit'
                value="Créer et vérouiller"
            />
            {lockedError && <span>{lockedError}</span>}
        </form>
    )
};

export default TournamentUpdateForm;