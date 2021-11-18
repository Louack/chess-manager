import React from 'react'
import {useNavigate} from "react-router-dom";

const PlayersListItem = ({tournament, player}) => {
    let navigate = useNavigate();
    const handleClick = () => {
        tournament?
            tournament.open?
                navigate(`/players/${player.number}/`) :
                navigate(`/tournaments/${tournament.number}/participants/${player.number}/`) :
            navigate(`/players/${player.number}/`)
    }
    return (
        <div onClick={handleClick} className='player-item'>
            <p>{player.username}</p>
        </div>
    )
}

export default PlayersListItem