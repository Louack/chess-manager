import React from 'react'
import { Link, useParams } from "react-router-dom";

const RoundsListItem = ({ round }) => {
    const { tourID } = useParams()
    
    return (
        <li  className='one-element-item'>
            <Link to={`/tournaments/${tourID}/rounds/${round.number}/`} style={round.finished_matches === 4 ? {backgroundColor: "rgb(121, 165, 121)"} : {backgroundColor: "lightblue"}}>
                <span>Ronde #{round.number}</span>
                <span>Matchs terminés : {round.finished_matches}/4</span>
            </Link>
        </li>
    )
}

export default RoundsListItem
