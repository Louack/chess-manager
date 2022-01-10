import React from 'react'
import {useNavigate} from "react-router-dom";
import getFormattedDate from '../utils/genericFunctions';


const TournamentsListItem = ({tournament}) => {
    let navigate = useNavigate();
    const handleClick = () => {
        navigate(`/tournaments/${tournament.number}/`)
    }

    return (
        <li onClick={handleClick} className='tournament-item'>
            <span>
                {tournament.number}
            </span>
            <span>
                {tournament.name}
            </span>
            <span>
                {
                    tournament.tournament_date ? 
                        getFormattedDate(tournament.tournament_date) 
                        : 
                        "Non définie" 
                }
            </span>
        </li>
    )
}

export default TournamentsListItem
