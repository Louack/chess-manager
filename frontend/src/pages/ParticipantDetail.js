import React, {useEffect, useState} from 'react';
import BasePage from "./BasePage";
import {useNavigate, useParams, Link} from "react-router-dom";
import useAxios from "../utils/useAxios";
import Spinner from '../components/Spinner';

const ParticipantDetail = () => {
    const { tourID, partID } = useParams()
    const navigate = useNavigate();
    const axios = useAxios()
    const [participant, setParticipant] = useState('')
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    const backToTournament = () => {
        navigate(`/tournaments/${tourID}/`)
    }

    useEffect(() => {
        if (!participant) {
            axios.get(`/api/tournaments/${tourID}/participants/${partID}/`)
                .then((response) => setParticipant(response.data))
                .catch((error) => {
                    if (error.response.status === 404) {
                        setLoading(false)
                        setNotFound(true)
                    }
                })
        } else {
            setLoading(false)
        }
    }, [participant, tourID, partID, axios])

    const participantDiv =
    <>
        <div className='detail-first-level'>
            <h3>Informations générales</h3>
            <div className='detail-second-level'>
                <h4>Nom d'utilisateur</h4> 
                <span>{participant.username}</span>
            </div>
            <div className='detail-second-level'>
                <h4>Nom</h4> 
                <span>{participant.last_name}</span>
            </div>
            <div className='detail-second-level'>
                <h4>Prénom</h4> 
                <span>{participant.first_name}</span>
            </div>
        </div>
        <div className='detail-first-level'>
            <h3>Informations tournoi</h3>
            <div className='detail-second-level'>
                <h4>ID tournoi</h4> 
                <span><Link to={`/tournaments/${tourID}/`}>#{tourID}</Link></span>
            </div>
            <div className='detail-second-level'>
                <h4>Rang (le jour du tournoi)</h4> 
                <span>{participant.rank}</span>
            </div>
            <div className='detail-second-level'>
                <h4>Nombre de points</h4> 
                <span>{participant.total_points}</span>
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
                        <h2 onClick={backToTournament}>Participant #{participant.number}</h2>
                        {participantDiv}
                    </div>
                )
            } else {
                return (
                    <div className='main-container'> 
                        <h2 onClick={backToTournament}>Tournoi #{tourID}</h2>
                        <p>Cette page n'existe pas.</p>
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

export default ParticipantDetail;