import React from 'react'
import {useNavigate} from "react-router-dom";

const PlayersListItem = ({tournament, player}) => {
    let navigate = useNavigate();
    const handleClick = () => {
        tournament.open?
            navigate(`/players/${player.number}/`) :
            navigate(`/tournaments/${tournament.number}/participants/${player.number}/`)
    }
    return (
        <div onClick={handleClick} className='round-item'>
            <p>{player.username}</p>
        </div>
    )
}

export default PlayersListItem