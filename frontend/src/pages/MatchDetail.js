import React, {useEffect, useState} from 'react'
import BasePage from "./BasePage";
import {useNavigate, useParams} from "react-router-dom";
import useAxios from '../utils/useAxios';

const MatchDetail = () => {
    const { tourID, roundID, matchID } = useParams()
    const [loading, setLoading] = useState(true)
    const [match, setMatch] = useState('')
    const [playerOne, setPlayerOne] = useState('')
    const [playerTwo, setPlayerTwo] = useState('')
    const [validDisabled, setValidDisabled] = useState()
    const [isSubmitting, setIsSubmitting] = useState()
    const axios = useAxios()
    const navigate = useNavigate();
    const url = `/api/tournaments/${tourID}/rounds/${roundID}/matches/${matchID}/`

    const backToTournament = () => {
        navigate(`/tournaments/${tourID}/`)
    }

    const backToRound = () => {
        navigate(`/tournaments/${tourID}/rounds/${roundID}/`)
    }

    const getMatch = async () => {
        const response = await axios.get(url)
        setMatch(response.data)
    }

    const getPlayer = async (playerNumber) =>  {
        const url = `/api/tournaments/${tourID}/participants/${playerNumber}/`
        const response = await axios.get(url)
        return response.data
    }

    const setDraw = async(e) => {

        if (e.target.className !== 'draw-match') {
            const data = {
                played: false,
                result_participant_1: 0.5,
                result_participant_2: 0.5
            }
            try {
                const response = await axios.put(url, data)
            } catch(error) {
                console.log(error.response.data)
            }
        }
    }

    const setWinner = async(e) => {
        if (e.target.className !== 'is-winner') {
            if (e.target.id === 'player-one') {
                const data = {
                    played: false,
                    result_participant_1: 1.0,
                    result_participant_2: 0.0
                }
                try {
                    const response = await axios.put(url, data)
                } catch(error) {
                    console.log(error.response.data)
                }
            } else {
                const data = {
                    played: false,
                    result_participant_1: 0,
                    result_participant_2: 1
                }
                const response = await axios.put(url, data)
            }
        }
    }

    const patchValidation = () => {
        setIsSubmitting(true)
    }

    const setClassName = (e) => {
        if (e.target.id === 'player-one') {
            if (match.result_participant_1 === 1) {

            }
        }
    }

    const checkReadyforValidation = () => {
        if (!match.played) {
            if (!match.result_participant_1 && !match.result_participant_2) {
                setValidDisabled(true)
            } else {
                setValidDisabled(false)
            }
        } else {
            setValidDisabled(true)
        }
    }

    useEffect(() => {
        if (!match) {
            getMatch()
        }

        if (isSubmitting) axios.patch(url, {played: true})
    }, [match, playerOne, playerTwo, isSubmitting])

    useEffect(() => {
        if (match && !playerOne) {
            const playerOneNumber = match.number_participant_1
            getPlayer(playerOneNumber).then((player) => setPlayerOne(player))
        }
    }, [match, playerOne])

    useEffect(() => {
        if (match && !playerTwo) {
            const playerTwoNumber = match.number_participant_2
            getPlayer(playerTwoNumber).then((player) => setPlayerTwo(player))
        }
    }, [match, playerTwo])

    useEffect(() => {
        if (playerOne && playerTwo) {
            checkReadyforValidation()
            setLoading(false)
        }
    }, [playerOne, playerTwo])

    const getMainElement = () => {
        if (loading) {
            return (
                <div>
                    <p>Chargement...</p>
                </div>
            )
        } else {
            return (
                <div>
                    <h1 onClick={backToTournament}>Tournoi n°{tourID}</h1>
                    <h2 onClick={backToRound}>Round n°{roundID}</h2>
                    <div>
                        <div className={'match-not-played'} id={'player-one'} onClick={setWinner}>
                            {playerOne.username}
                            {match.result_participant_1}
                        </div>
                        <div className={'match-not-played'} id={'draw'} onClick={setDraw}>
                            versus
                        </div>
                        <div className={'match-not-played'} id={'player-two'} onClick={setWinner}>
                            {playerTwo.username}
                            {match.result_participant_2}
                        </div>
                        {!match.played && <
                            button
                            disabled={validDisabled || isSubmitting}
                            onClick={patchValidation}
                        >Valider
                        </button>}
                    </div>
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

export default MatchDetail
