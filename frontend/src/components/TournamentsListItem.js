import React from 'react'
import { Link }  from "react-router-dom";
import getFormattedDate from '../utils/genericFunctions';


const TournamentsListItem = ({tournament}) => {

    return (
        <li className='tournament-item'>
            <Link to={`/tournaments/${tournament.number}/`}>
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
            </Link>
        </li>
    )
}

export default TournamentsListItem
