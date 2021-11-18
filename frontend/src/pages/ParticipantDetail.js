import React, {useEffect, useState} from 'react';
import BasePage from "./BasePage";
import {useNavigate, useParams} from "react-router-dom";
import useAxios from "../utils/useAxios";

const ParticipantDetail = () => {
    const { tourID, partID } = useParams()
    const navigate = useNavigate();
    const axios = useAxios()
    const [participant, setParticipant] = useState('')
    const [loading, setLoading] = useState(true)

    const backToTournament = () => {
        navigate(`/tournaments/${tourID}/`)
    }

    useEffect(() => {
        if (!participant) {
            axios.get(`/api/tournaments/${tourID}/participants/${partID}/`)
                .then((response) => setParticipant(response.data))
        } else {
            setLoading(false)
        }
    }, [participant, tourID, partID, axios])

    const participantDiv =
        <div>
            {participant.username}
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
                <div>
                    <h1 onClick={backToTournament}>Tournoi n°{tourID}</h1>
                    {participantDiv}
                </div>
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

export default ParticipantDetail;