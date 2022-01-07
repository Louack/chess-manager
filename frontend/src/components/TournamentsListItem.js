import React from 'react'
import {useNavigate} from "react-router-dom";


const TournamentsListItem = ({tournament}) => {
    let navigate = useNavigate();
    const handleClick = () => {
        navigate(`/tournaments/${tournament.number}/`)
    }

    const getFormattedDate = (date) => {
        let day = date.slice(8, 10)
        let month = date.slice(5, 7)
        let year = date.slice(0, 4)
        return (day + "/" + month + "/" + year)
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
