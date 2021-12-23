import React, {useEffect, useState} from 'react';
import BasePage from "./BasePage";
import useAxios from "../utils/useAxios";
import PlayersListItem from "../components/PlayersListItem";
import PlayerCreation from "../components/PlayerCreation";
import Pagination from '../components/Pagination';

const Players = () => {
    const axios = useAxios()
    const [loading, setLoading] = useState(true);
    const [created, setCreated] = useState(true)
    const [playersList, setPlayersList] = useState([])
    const [apiURL, setApiURL] = useState('/api/players/')
    const [apiNext, setApiNext] = useState('')
    const [apiPrevious, setApiPrevious] = useState('')
    const [playersCount, setPlayersCount] = useState(null)

    const handleCreated = () => {
        setLoading(true)
        setPlayersList([])
        setCreated(false)
    }

    useEffect(() => {
        if (created) handleCreated()
    }, [created])

    useEffect(() => {
        if (loading) {
            axios.get(apiURL)
                .then((response) => {
                    setPlayersList(response.data.results)
                    setApiNext(response.data.next)
                    setApiPrevious(response.data.previous)
                    setPlayersCount(response.data.count)
                    setLoading(false)
                })
        }
    }, [loading]);

    const playersListDiv =
        <div className={'players-list'}>
            <PlayerCreation setCreated={setCreated}/>
            {playersList.map((player) => (
                <PlayersListItem
                    key={player.number}
                    player={player}
                />
            ))}
            <Pagination 
            apiURL={apiURL}
            setApiURL={setApiURL}
            apiPrevious={apiPrevious}
            apiNext={apiNext}
            objectsCount={playersCount}
            setLoading={setLoading}
            />
        </div>

    let mainElement = 
    <div>
        <h1>Liste des joueurs</h1>
        {
            loading ? 
                <p>Chargement...</p> 
                :
                playersListDiv
        }
        </div>

    return (
        <div>
            <BasePage main={mainElement} />
        </div>
    )
};

export default Players;