import React, { useState } from 'react'
import { Link } from "react-router-dom";
import getFormattedDate from '../utils/genericFunctions';

const PlayersListItem = ({tournament, player}) => {
    const [link, setLink] = useState(() => {
        if (tournament) {
            if (tournament.open) {
                return `/players/${player.number}/`
            } else {
                return `/tournaments/${tournament.number}/participants/${player.number}/`
            } 
        } else {
            return `/players/${player.number}/`
        } 
    })


    return (
        <li className='two-elements-item'>
            <Link to={link}>
                <span className='id-item'>
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
            </Link>
        </li>
    )
}

export default PlayersListItem