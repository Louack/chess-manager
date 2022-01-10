import React, {useEffect, useState} from 'react';
import BasePage from "./BasePage";
import {useParams} from "react-router-dom";
import useAxios from "../utils/useAxios";
import PlayerUpdate from "../components/PlayerUpdate";
import PlayerDelete from "../components/PlayerDelete";
import Spinner from '../components/Spinner';

const PlayerDetail = () => {
    const { playerID } = useParams()
    const axios = useAxios()
    const [player, setPlayer] = useState('')
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)
    const [updated, setUpdated] = useState(false)

    const handleUpdate = () => {
        setLoading(true)
        setPlayer('')
        setUpdated(false)
    }

    useEffect(() => {
        if (!player) {
            axios.get(`/api/players/${playerID}/`)
                .then((response) => setPlayer(response.data))
                .catch((error) => {
                    if (error.response.status === 404) {
                        setLoading(false)
                        setNotFound(true)
                    }
                })
        } else {
            setLoading(false)
        }
    }, [player, playerID, axios])

    useEffect(() => {
        if (updated) handleUpdate()
    }, [updated])

    const playerDiv =
        <>
            <h2>Joueur #{player.number}</h2>
            <div className='detail-first-level'>
                <h3>Informations générales</h3>
                <div className='detail-second-level'>
                    <h4>Nom d'utilisateur</h4> 
                    <span>{player.username}</span>
                </div>
                <div className='detail-second-level'>
                    <h4>Nom</h4> 
                    <span>{player.last_name}</span>
                </div>
                <div className='detail-second-level'>
                    <h4>Prénom</h4> 
                    <span>{player.first_name}</span>
                </div>
                <div className='detail-second-level'>
                    <h4>Rang</h4> 
                    <span>{player.rank}</span>
                </div>
            </div>
            <div className='detail-first-level'>
                <h3>Statistiques</h3>
                <div className='detail-second-level'>
                    <h4>Place moyenne</h4> 
                    <span>{player.avg_place}</span>
                </div>
                <div className='detail-second-level'>
                    <h4>Nombre de tournois joués</h4> 
                    <span>{player.tournaments_played}</span>
                </div>
                <div className='detail-second-level'>
                    <h4>Nombre de tournois gagnés</h4> 
                    <span>{player.tournaments_won}</span>
                </div>
            </div>
        </>

    const getMainElement = () => {
        if (loading) {
            return (
                <Spinner />
            )
        } else {
            if (!notFound) {
                return (
                    <div className='main-container'>
                        {playerDiv}
                        <PlayerUpdate
                            player={player}
                            setUpdated={setUpdated}
                        />
                        {!player.tournaments_list?.length && <PlayerDelete
                            player={player}
                        />}
                    </div>
                )
            } else {
                return (
                    <div className='main-container'>
                        Cette page n'existe pas.
                    </div>
                )
            }
        }
    }

    let mainElement = getMainElement()

    return (
        <BasePage main={mainElement} />
    )
};

export default PlayerDetail;