import React from 'react'
import {useNavigate} from "react-router-dom";


const TournamentsListItem = ({tournament}) => {
    let navigate = useNavigate();
    const handleClick = () => {
        navigate(`/tournaments/${tournament.number}/`)
    }
    return (
        <div onClick={handleClick} className='tournament-item'>
            <p>{tournament.name}</p>
        </div>
    )
}

export default TournamentsListItem
