import React, {useEffect, useState} from 'react';
import BasePage from "./BasePage";
import useAxios from "../utils/useAxios";
import PlayersListItem from "../components/PlayersListItem";
import PlayerCreation from "../components/PlayerCreation";

const Players = () => {
    const axios = useAxios()
    const [loading, setLoading] = useState(true);
    const [created, setCreated] = useState(true)
    const [playersList, setPlayersList] = useState([])

    const handleCreated = () => {
        setLoading(true)
        setPlayersList([])
        setCreated(false)
    }

    useEffect(() => {
        if (created) handleCreated()
    }, [created])

    useEffect(() => {
        if (!playersList.length) {
            axios.get('/api/players/')
                .then((response) => {
                    setPlayersList(response.data.results)
                })
        } else {
            setLoading(false)
        }
    }, [playersList, axios]);

    const playersListDiv =
        <div className={'players-list'}>
            <PlayerCreation setCreated={setCreated}/>
            {playersList.map((player) => (
                <PlayersListItem
                    key={player.number}
                    player={player}
                />
            ))}
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