import React, {useEffect, useState} from 'react';
import BasePage from "./BasePage";
import useAxios from "../utils/useAxios";
import PlayersListItem from "../components/PlayersListItem";
import PlayerCreation from "../components/PlayerCreation";
import Pagination from '../components/Pagination';
import Spinner from "../components/Spinner";

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
                    console.log(response.data.results[0])
                    setPlayersList(response.data.results)
                    setApiNext(response.data.next)
                    setApiPrevious(response.data.previous)
                    setPlayersCount(response.data.count)
                    setLoading(false)
                })
        }
    }, [loading]);

    const playersListDiv =
        <>
            <div className={'objects-list'}>
                <ul className={'generic-list'}>
                    <li>
                        <span>#</span>
                        <span>Pseudo</span>
                        <span>Date de création</span>
                    </li>
                    {playersList.map((player) => (
                        <PlayersListItem
                            key={player.number}
                            player={player}
                        />
                    ))}
                </ul>
                <Pagination 
                apiURL={apiURL}
                setApiURL={setApiURL}
                apiPrevious={apiPrevious}
                apiNext={apiNext}
                objectsCount={playersCount}
                setLoading={setLoading}
                />
            </div>
            <PlayerCreation setCreated={setCreated}/>
        </>

    let mainElement = 
    loading ?
    <Spinner />
    :
    <div className='main-container'>
        <h2>Mes Joueurs</h2>
        {playersListDiv}
    </div>

    return (
        <BasePage main={mainElement} />
    )
};

export default Players;