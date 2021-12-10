import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import useAxios from '../utils/useAxios';
import RoundsListItem from "../components/RoundsListItem";
import PlayersListItem from "../components/PlayersListItem";
import TournamentUpdate from "../components/TournamentUpdate";
import BasePage from "./BasePage";
import TournamentDelete from "../components/TournamentDelete";

const TournamentDetail = () => {
    const [tournament, setTournament] = useState('')
    const [playersList, setPlayersList] = useState([])
    const [numbersList, setNumbersList] = useState([])
    const [roundsList, setRoundsList] = useState([])
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)
    const [updated, setUpdated] = useState(true)
    const { tourID } = useParams()
    const axios = useAxios()

    const getTournament = async () => {
        try {
            const response = await axios.get(`/api/tournaments/${tourID}`)
            setTournament(response.data)
            response.data.open ?
                setNumbersList(response.data.players_list) :
                setNumbersList([1, 2, 3, 4, 5, 6, 7, 8])
        } catch (error) {
            if (error.response.status === 404) {
                setLoading(false)
                setNotFound(true)
            }
        }
    }

    const getPlayersList = async (url) => {
        const response = await axios.get(url)
        let tempPlayersList = playersList
        tempPlayersList.push(response.data)
        setPlayersList(tempPlayersList)
        setNumbersList(numbersList.slice(1))
    }

    const getRoundsList = async() => {
        const response = await axios.get(`/api/tournaments/${tourID}/rounds/`)
        setRoundsList(response.data)
    }

    const handleUpdate = () => {
        setLoading(true)
        setPlayersList([])
        setRoundsList([])
        setNumbersList([])
        setTournament('')
        setUpdated(false)
    }

    useEffect(() => {
        if (updated) handleUpdate()
    }, [updated])

    useEffect(() => {
        if (!tournament) getTournament()
    }, [tournament])

    useEffect(() => {
        if (tournament && !tournament.open) getRoundsList()
    }, [tournament])

    useEffect(() => {
        if (numbersList.length) {
            if (tournament.open) {
                getPlayersList(`/api/players/${numbersList[0]}/`)
            } else {
                getPlayersList(`/api/tournaments/${tourID}/participants/${numbersList[0]}/`)
            }
        }
        if (tournament) {
            if (playersList.length === tournament.players_list.length)
            setLoading(false)
            setUpdated(false)
        }
    }, [numbersList])

    let roundsListDiv =
        <div className={'rounds-list'}>
            <h2>Liste des Rondes</h2>
            {roundsList.map((round) => (
                    <RoundsListItem
                        key={round.number}
                        round={round}
                    />
                ))}
        </div>

    let playersListDiv =
        <div className={'players-list'}>
            <h2>Liste des Joueurs</h2>
            {playersList.map((player) => (
                <PlayersListItem
                    key={player.number}
                    tournament={tournament}
                    player={player}
                />
            ))}
        </div>

    const getMainElement = () => {
        if (loading) {
            return (
                <>
                    <p>Chargement...</p>
                </>
            );
        } else {
            if (!notFound) {
                return (
                    <>
                        <h1>{tournament.name}</h1>
                        {roundsListDiv}
                        {playersListDiv}
                        {tournament.open &&
                        <TournamentUpdate
                            tournament={tournament}
                            setUpdated={setUpdated}
                        />}
                        <TournamentDelete
                            tournament={tournament}
                        />
                    </>
                );
            } else {
                return (
                    <>
                        <p>Cette page n'existe pas.</p>
                    </>
                );
            }
        }
    };
    let mainElement = getMainElement()

    return (
        <BasePage main={mainElement} />
    );
}

export default TournamentDetail
