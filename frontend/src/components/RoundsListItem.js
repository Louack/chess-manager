import React from 'react'
import {useNavigate, useParams} from "react-router-dom";

const RoundsListItem = ({ round }) => {
    const { tourID } = useParams()
    let navigate = useNavigate();
    const handleClick = () => {
        navigate(`/tournaments/${tourID}/rounds/${round.number}/`)
    }
    return (
        <li onClick={handleClick} className='one-element-item' style={round.finished_matches === 4 ? {backgroundColor: "rgb(121, 165, 121)"} : {backgroundColor: "rgb(253, 98, 98)"}}>
            <span>Ronde #{round.number}</span>
        </li>
    )
}

export default RoundsListItem
