import React, {useEffect, useState} from 'react'
import BasePage from "./BasePage";
import {useNavigate, useParams, Link} from "react-router-dom";
import useAxios from '../utils/useAxios';
import MatchesListItem from "../components/MatchesListItem";
import Spinner from '../components/Spinner';

const RoundDetail = () => {
    const { tourID, roundID } = useParams()
    const [round, setRound] = useState('')
    const [roundDiv, setRoundDiv] = useState('')
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)
    const axios = useAxios()
    const navigate = useNavigate();

    const backToTournament = () => {
        navigate(`/tournaments/${tourID}/`)
    }

    const getRound = async () => {
        try {
            const response = await axios.get(`/api/tournaments/${tourID}/rounds/${roundID}/`)
            setRound(response.data)
        } catch(error) {
            if (error.response.status === 404) {
                setLoading(false)
                setNotFound(true)
            }
        }
    }

    const getRoundDiv = () => {
        const renderedRoundDiv = 
        <>
            <div className='detail-first-level'>
                <h3>Informations générales</h3>
                <div className='detail-second-level'>
                    <h4>ID tournoi</h4> 
                    <span><Link to={`/tournaments/${tourID}/`}>#{tourID}</Link></span>
                </div>
                <div className='detail-second-level'>
                    <h4>Statut</h4> 
                    <span>{round.played ? "Terminée" : "En cours"}</span>
                </div>
            </div>
            <h3>Liste des matchs</h3>
            <ul className={'horizontal-wrap-list'}>
                {round.matches.map((match) => {
                    return (
                        <MatchesListItem
                            key={match.number}
                            match={match}
                        />
                    )
                })}
            </ul>
        </>
        setRoundDiv(renderedRoundDiv)
        setLoading(false)
    }

    useEffect(() => {
        getRound()
    }, [])

    useEffect(() => {
        if (round) getRoundDiv()
    }, [round])


    const getMainElement = () => {
        if (loading) {
            return <Spinner />
        } else {
            if (!notFound) {
                return (
                    <div className='main-container'>
                        <h2>Ronde #{round.number}</h2>
                        {roundDiv}
                    </div>
                )
            } else {
                return (
                    <div className='main-container'>
                        <h2>Ronde #{round.number}</h2>
                        <p>Cette page n'existe pas</p>
                    </div>
                )
            }
        }
    }

    let mainElement = getMainElement()

    return (
        <BasePage main={mainElement} />
    )
}

export default RoundDetail
