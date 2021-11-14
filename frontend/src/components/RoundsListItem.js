import React from 'react'
import {useNavigate} from "react-router-dom";

const RoundsListItem = ({tournamentNumber, round}) => {
    let navigate = useNavigate();
    const handleClick = () => {
        navigate(`/tournaments/${tournamentNumber}/rounds/${round.number}/`)
    }
    return (
        <div onClick={handleClick} className='round-item'>
            <p>Ronde n°{round.number}</p>
        </div>
    )
}

export default RoundsListItem
