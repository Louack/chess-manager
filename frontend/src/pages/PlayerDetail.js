import React, {useEffect, useState} from 'react';
import BasePage from "./BasePage";
import {useParams} from "react-router-dom";
import useAxios from "../utils/useAxios";
import PlayerUpdate from "../components/PlayerUpdate";
import PlayerDelete from "../components/PlayerDelete";

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
        <div>
            {player.username}
        </div>

    const getMainElement = () => {
        if (loading) {
            return (
                <div>
                    Chargement...
                </div>
            )
        } else {
            if (!notFound) {
                return (
                    <>
                        {playerDiv}
                        <PlayerUpdate
                            player={player}
                            setUpdated={setUpdated}
                        />
                        {!player.tournaments_list?.length && <PlayerDelete
                            player={player}
                        />}
                    </>
                )
            } else {
                return (
                    <div>
                        Cette page n'existe pas.
                    </div>
                )
            }
        }
    }

    let mainElement = getMainElement()

    return (
        <div>
            <BasePage main={mainElement} />
        </div>
    )
};

export default PlayerDetail;