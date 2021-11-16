import React from 'react'
import {useNavigate, useParams} from "react-router-dom";

const MatchesListItem = ( {match} ) => {
    const { tourID, roundID } = useParams()
    let navigate = useNavigate();
    const handleClick = () => {
        navigate(`/tournaments/${tourID}/rounds/${roundID}/matches/${match.number}/`)
    }
    return (
        <div onClick={handleClick} className='round-item'>
            <h2>Match n°{match.number}</h2>
            <p>{match.participant_1.username} versus {match.participant_2.username}</p>
        </div>
    )
}

export default MatchesListItem
