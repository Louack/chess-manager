import React, {useEffect, useState} from 'react'
import BasePage from "./BasePage";
import {useNavigate, useParams} from "react-router-dom";
import useAxios from '../utils/useAxios';
import MatchesListItem from "../components/MatchesListItem";

const RoundDetail = () => {
    const { tourID, roundID } = useParams()
    const [round, setRound] = useState('')
    const [roundDiv, setRoundDiv] = useState('')
    const [loading, setLoading] = useState(true)
    const axios = useAxios()
    const navigate = useNavigate();

    const backToTournament = () => {
        navigate(`/tournaments/${tourID}/`)
    }

    const getRound = async () => {
        const response = await axios.get(`/api/tournaments/${tourID}/rounds/${roundID}/`)
        setRound(response.data)
    }

    const getRoundDiv = () => {
        const renderedRoundDiv = round.matches.map((match) => {
                return <
                    MatchesListItem
                    key={match.number}
                    match={match}
                />
            })
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
            return <p>Chargement</p>
        } else {
            return (
                <div>
                    <h1 onClick={backToTournament}>Tournoi n°{tourID}</h1>
                    <h2>Ronde n°{round.number}</h2>
                    {roundDiv}
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
}

export default RoundDetail
