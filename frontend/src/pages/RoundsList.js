import  {useEffect} from 'react'
import {useNavigate, useParams} from "react-router-dom";

const RoundsList = () => {
    const { tourID } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        navigate(`/tournaments/${tourID}/`)
    }, [navigate, tourID])

    return null
}

export default RoundsList
