import React from 'react'
import {useNavigate, useParams} from "react-router-dom";

const RoundsListItem = ({ round }) => {
    const { tourID } = useParams()
    let navigate = useNavigate();
    const handleClick = () => {
        navigate(`/tournaments/${tourID}/rounds/${round.number}/`)
    }
    return (
        <div onClick={handleClick} className='round-item'>
            <p>Ronde n°{round.number}</p>
        </div>
    )
}

export default RoundsListItem
