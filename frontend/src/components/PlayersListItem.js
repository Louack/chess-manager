import React from 'react'
import {useNavigate} from "react-router-dom";
import getFormattedDate from '../utils/genericFunctions';

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
        <li onClick={handleClick} className='player-item'>
            <span>
                {tournament && "#"}{player.number}
            </span>
            <span>
                {player.username}
            </span>
            {!tournament && <span>
                {
                    player.date_created ? 
                        getFormattedDate(player.date_created)
                        :
                        "Non définie"
                }
            </span>}
        </li>
    )
}

export default PlayersListItem