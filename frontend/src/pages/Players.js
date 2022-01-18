import React, {useEffect, useState} from 'react';
import BasePage from "./BasePage";
import useAxios from "../utils/useAxios";
import PlayersListItem from "../components/PlayersListItem";
import PlayerCreation from "../components/PlayerCreation";
import Pagination from '../components/Pagination';
import Spinner from "../components/Spinner";
import { getFormattedUrlApi } from '../utils/genericFunctions';

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
            try {
                axios.get(apiURL)
                    .then((response) => {
                        setPlayersList(response.data.results)
                        setApiNext(getFormattedUrlApi(response.data.next))
                        setApiPrevious(getFormattedUrlApi(response.data.previous))
                        setPlayersCount(response.data.count)
                        setLoading(false)
                    })
            } catch(error) {
                console.log(error.response.status)
            }
        }
    }, [loading]);

    const playersListDiv =
        <>
            {playersList.length ? 
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
                </div> :
                <span style={{alignSelf: "center"}}>Il n'y a aucun joueur à afficher.</span>}
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