import React, {useEffect, useState} from 'react';
import BasePage from "./BasePage";
import {useParams} from "react-router-dom";
import useAxios from "../utils/useAxios";

const PlayerDetail = () => {
    const { playerID } = useParams()
    const axios = useAxios()
    const [player, setPlayer] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!player) {
            axios.get(`/api/players/${playerID}/`)
                .then((response) => setPlayer(response.data))
        } else {
            setLoading(false)
        }
    }, [player, playerID, axios])

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
            return (
                playerDiv
            )
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