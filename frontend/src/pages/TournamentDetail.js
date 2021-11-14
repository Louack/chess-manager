import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import useAxios from '../utils/useAxios';

const TournamentDetail = () => {
    const [tournament, setTournament] = useState('')
    const [playersList, setPlayersList] = useState([])
    const [numbersList, setNumbersList] = useState([])
    const { tourID } = useParams()
    const axios = useAxios()

    const getTournament = async () => {
        const response = await axios.get(`/api/tournaments/${tourID}`)
        setTournament(response.data)
        console.log(response.data)
        response.data.open ?
            setNumbersList(response.data.players_list) :
            setNumbersList([1, 2, 3, 4, 5, 6, 7 ,8])
    }

    const getPlayersList = async (url) => {
        const response = await axios.get(url)
        let tempPlayersList = playersList
        tempPlayersList.push(response.data)
        setPlayersList(tempPlayersList)
        setNumbersList(numbersList.slice(1))
        console.log(playersList)
    }

    useEffect(() => {
        getTournament()
    }, [])

    useEffect(() => {
        if (numbersList.length) {
            if (tournament.open) {
                getPlayersList(`/api/players/${numbersList[0]}/`)
            } else {
                getPlayersList(`/api/tournaments/${tourID}/participants/${numbersList[0]}/`)
            }
        }
    }, [numbersList])

    return (
        <div>
            <p>{tournament.name}</p>
        </div>
    )
}

export default TournamentDetail
