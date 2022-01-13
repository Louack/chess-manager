import React, {useEffect, useRef, useState} from 'react'
import BasePage from "./BasePage";
import {useParams, Link} from "react-router-dom";
import useAxios from '../utils/useAxios';
import Spinner from '../components/Spinner';
import MatchPlayerCard from '../components/MatchPlayerCard';
import NotFound from './NotFound';

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
    const url = `/api/tournaments/${tourID}/rounds/${roundID}/matches/${matchID}/`

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
            if (drawCard.current.contains(e.target) && drawCard.current.className === 'draw-btn-open') {
                const data = {
                    played: false,
                    result_participant_1: 0.5,
                    result_participant_2: 0.5
                }
                const response = await axios.put(url, data)
                reload()
            }
        }
    }

    const setWinner = async(e) => {
        if (!match.played) {
            if (playerOneCard.current.contains(e.target) && playerOneCard.current.className !== 'winner') {
                    const data = {
                        played: false,
                        result_participant_1: 1.0,
                        result_participant_2: 0.0
                    }
                    const response = await axios.put(url, data)
                    reload()
                } else if (playerTwoCard.current.contains(e.target) && playerTwoCard.current.className !== 'winner') {
                    const data = {
                        played: false,
                        result_participant_1: 0,
                        result_participant_2: 1
                    }
                    const response = await axios.put(url, data)
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
                <Spinner />
            )
        } else {
            if (!notFound) {
                return (
                    <div className='main-container'>
                        <h2>Tournoi #{tourID} / Ronde #{roundID} / Match #{match.number}</h2>
                        <div className='detail-first-level'>
                            <h3>Informations générales</h3>
                            <div className='detail-second-level'>
                                <h4>Lien tournoi</h4> 
                                <span><Link to={`/tournaments/${tourID}/`}>#{tourID}</Link></span>
                            </div>
                            <div className='detail-second-level'>
                                <h4>Lien ronde</h4> 
                                <span><Link to={`/tournaments/${tourID}/rounds/${roundID}/`}>#{roundID}</Link></span>
                            </div>
                            <div className='detail-second-level'>
                                <h4>Liens participants</h4> 
                                <span>
                                    <Link to={`/tournaments/${tourID}/participants/${playerOne.number}/`}>#{playerOne.number}</Link> et <Link to={`/tournaments/${tourID}/participants/${playerTwo.number}/`}>#{playerTwo.number}</Link>
                                </span>
                            </div>
                            <div className='detail-second-level'>
                                <h4>Statut</h4> 
                                <span>{match.played ? "Terminé" : "En cours"}</span>
                            </div>
                        </div>
                        <div className='detail-first-level'>
                            <h3>Résultat</h3>
                            <div className='match-result-display'>
                                <div ref={playerOneCard} onClick={setWinner}>
                                    <MatchPlayerCard 
                                        player={playerOne}
                                    />
                                </div >
                                <span className='result-point'>{match.result_participant_1}</span>
                                <div ref={drawCard} id={'draw'} onClick={setDraw}>
                                    <span className='versus-card'>{match.played || (match.result_participant_1 === 0.5) ? "VS" : "Egalité"}</span>
                                </div>
                                <span className='result-point'>{match.result_participant_2}</span>
                                <div ref={playerTwoCard} onClick={setWinner}>
                                    <MatchPlayerCard 
                                        player={playerTwo}
                                    />
                                </div>
                            </div>
                        </div>
                        {!validDisabled && <
                                button
                                className='creation-btn'
                                onClick={patchValidation}
                            >Valider
                            </button>}
                    </div>
                )
            } else {
                return (
                    <NotFound />
                )
            }
        }
    }

    let mainElement = getMainElement()

    return (
        <BasePage main={mainElement} />
    )
}

export default MatchDetail
