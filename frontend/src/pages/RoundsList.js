import React, {useEffect, useState} from 'react'
import BasePage from "./BasePage";
import {useNavigate, useParams} from "react-router-dom";
import useAxios from '../utils/useAxios';
import RoundsListItem from "../components/RoundsListItem";

const RoundsList = () => {
    const { tourID } = useParams()
    const [roundsListData, setRoundsListData] = useState([])
    const [roundsListDiv, setRoundsListDiv] = useState([])
    const [loading, setLoading] = useState(true)
    const axios = useAxios()
    const navigate = useNavigate();

    const backToTournament = () => {
        navigate(`/tournaments/${tourID}/`)
    }

    const getRoundsList = async () => {
        const response = await axios.get(`/api/tournaments/${tourID}/rounds/`)
        setRoundsListData(response.data)
    }

    const renderRoundsList = () => {
        const renderedRoundsList = roundsListData.map((round) => {
            return <
                RoundsListItem
                key={round.number}
                round={round}
            />
        })
        setRoundsListDiv(renderedRoundsList)
        setLoading(false)
    }

    useEffect(() => {
        renderRoundsList()
    }, [roundsListData])

    useEffect(() => {
        getRoundsList()
    }, [])

    const getMainElement = () => {
        if (loading) {
            return <p>Chargement</p>
        } else {
            return (
                <div>
                    <h1 onClick={backToTournament}>Tournament {tourID}</h1>
                    <h2>Liste des rounds</h2>
                    {roundsListDiv}
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

export default RoundsList
