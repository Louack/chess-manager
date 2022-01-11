import React from 'react'
import {useNavigate, useParams} from "react-router-dom";

const MatchesListItem = ( {match} ) => {
    const { tourID, roundID } = useParams()
    let navigate = useNavigate();
    const handleClick = () => {
        navigate(`/tournaments/${tourID}/rounds/${roundID}/matches/${match.number}/`)
    }
    return (
        <li onClick={handleClick} className='two-elements-item'>
            <span className='id-item'>#{match.number}</span>
            <div style={{display: "flex", flexDirection: "column"}}>
                <span>{match.participant_1.username}</span> 
                <span>versus</span> 
                <span>{match.participant_2.username}</span>
            </div>
        </li>
    )
}

export default MatchesListItem
