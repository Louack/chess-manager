import React, {useEffect, useRef, useState} from 'react'
import BasePage from "./BasePage";
import {useNavigate, useParams} from "react-router-dom";
import useAxios from '../utils/useAxios';

const MatchDetail = () => {
    const { tourID, roundID, matchID } = useParams()
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)
    const [match, setMatch] = useState('')
    const [playerOne, setPlayerOne] = useState('')
    const [playerTwo, setPlayerTwo] = useState('')
    const [validDisabled, setValidDisabled] = useState(false)
    const playerOneCard = useRef(null)
    const playerTwoCard = useRef(null)
    const drawCard = useRef(null)
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
        try {
            const response = await axios.get(url)
            return response.data
        } catch(error) {
            if (error.response.status === 404) {
                setLoading(false)
                setNotFound(true)
            }
        }
    }

    const getPlayer = async (playerNumber) =>  {
        const url = `/api/tournaments/${tourID}/participants/${playerNumber}/`
        const response = await axios.get(url)
        return response.data
    }

    const setDraw = async(e) => {
        if (!match.played) {
            if (e.target.className === 'draw-btn-open') {
                const data = {
                    played: false,
                    result_participant_1: 0.5,
                    result_participant_2: 0.5
                }
                try {
                    const response = await axios.put(url, data)
                } catch (error) {
                    console.log(error.response.data)
                }
            }
            reload()
        }
    }

    const setWinner = async(e) => {
        if (!match.played) {
            if (e.target.className !== 'winner') {
                if (e.target.id === 'player-one') {
                    const data = {
                        played: false,
                        result_participant_1: 1.0,
                        result_participant_2: 0.0
                    }
                    try {
                        const response = await axios.put(url, data)
                    } catch (error) {
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
                reload()
            }
        }
    }

    const patchValidation = () => {
        axios.patch(url, {played: true})
        reload()
    }

    const setClassNames = () => {
        if (match.result_participant_1 === 1) {
            playerOneCard.current.className = 'winner'
            playerTwoCard.current.className = 'loser'
            drawCard.current.className = 'draw-btn-open'
        } else if (match.result_participant_1 === 0.5) {
            playerOneCard.current.className = 'draw'
            playerTwoCard.current.className = 'draw'
            drawCard.current.className = 'draw-btn-closed'
        } else if (match.result_participant_1 === 0) {
            playerOneCard.current.className = 'loser'
            playerTwoCard.current.className = 'winner'
            drawCard.current.className = 'draw-btn-open'
        } else {
            playerOneCard.current.className = 'to-be-played'
            playerTwoCard.current.className = 'to-be-played'
            drawCard.current.className = 'draw-btn-open'
        }
        if (match.played) {
            playerOneCard.current.className = playerOneCard.current.className + '-locked'
            playerTwoCard.current.className = playerTwoCard.current.className + '-locked'
            drawCard.current.className = 'draw-btn-locked'
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

    const reload = () => {
        setMatch('')
        setPlayerOne('')
        setPlayerTwo('')
        setLoading(true)
    }

    useEffect(() => {
        if (loading) {
            getMatch()
                .then((match) => {
                    setMatch(match)
            })
        } else {
            if (!notFound) setClassNames()
        }
    }, [loading])

    useEffect(() => {
        if (match && !playerOne) {
            const playerOneNumber = match.number_participant_1
            getPlayer(playerOneNumber)
                .then((player) => setPlayerOne(player))
        }
    }, [match, playerOne])

    useEffect(() => {
        if (match && !playerTwo) {
            const playerTwoNumber = match.number_participant_2
            getPlayer(playerTwoNumber)
                .then((player) => setPlayerTwo(player))
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
                    <h1 onClick={backToTournament}>Tournoi n°{tourID}</h1>
                    <h2 onClick={backToRound}>Round n°{roundID}</h2>
                    <p>Chargement...</p>
                </div>
            )
        } else {
            if (!notFound) {
                return (
                    <div>
                        <h1 onClick={backToTournament}>Tournoi n°{tourID}</h1>
                        <h2 onClick={backToRound}>Round n°{roundID}</h2>
                        <div>
                            <div ref={playerOneCard} id={'player-one'} onClick={setWinner}>
                                {playerOne.username}
                                {match.result_participant_1}
                            </div>
                            <div ref={drawCard} id={'draw'} onClick={setDraw}>
                                versus
                            </div>
                            <div ref={playerTwoCard} id={'player-two'} onClick={setWinner}>
                                {playerTwo.username}
                                {match.result_participant_2}
                            </div>
                            {!validDisabled && <
                                button
                                onClick={patchValidation}
                            >Valider
                            </button>}
                        </div>
                    </div>
                )
            } else {
                return (
                    <div>
                        <h1 onClick={backToTournament}>Tournoi n°{tourID}</h1>
                        <h2 onClick={backToRound}>Round n°{roundID}</h2>
                        <p>Cette page n'existe pas.</p>
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
}

export default MatchDetail
