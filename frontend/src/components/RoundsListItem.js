import React from 'react'
import { Link, useParams } from "react-router-dom";

const RoundsListItem = ({ round }) => {
    const { tourID } = useParams()
    
    return (
        <li  className='one-element-item'>
            <Link to={`/tournaments/${tourID}/rounds/${round.number}/`} style={round.finished_matches === 4 ? {backgroundColor: "rgb(121, 165, 121)"} : {backgroundColor: "rgb(253, 98, 98)"}}>
                <span>Ronde #{round.number}</span>
            </Link>
        </li>
    )
}

export default RoundsListItem
