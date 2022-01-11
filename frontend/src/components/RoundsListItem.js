import React from 'react'
import {useNavigate, useParams} from "react-router-dom";

const RoundsListItem = ({ round }) => {
    const { tourID } = useParams()
    let navigate = useNavigate();
    const handleClick = () => {
        navigate(`/tournaments/${tourID}/rounds/${round.number}/`)
    }
    return (
        <li onClick={handleClick} className='one-element-item'>
            <span>Ronde #{round.number}</span>
        </li>
    )
}

export default RoundsListItem
