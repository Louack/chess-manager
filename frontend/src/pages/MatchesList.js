import React, {useEffect} from 'react'
import {useNavigate, useParams} from "react-router-dom";

const MatchesList = () => {
    const { tourID, roundID } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        navigate(`/tournaments/${tourID}/rounds/${roundID}/`)
    }, [])

    return null
}

export default MatchesList
