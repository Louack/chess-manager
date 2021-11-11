import React, { useEffect, useState} from "react";
import Navigation from '../components/Navigation';
import useAxios from '../utils/useAxios';

const TournamentsList = () => {
    const [tournamentsList, setTournamentsList] = useState([])
    const [loading, setLoading] = useState(true)

    let axios = useAxios()

    let getTournamentsList = async () => {
        let response = await axios.get('api/tournaments/')
        setTournamentsList(response.data.results)
        console.log(response.data.results)
        if (loading) {
            setLoading(false)
        } 
    }

    useEffect(() => {
        getTournamentsList()
    }, [])

    if (loading) {
        return (
            <div>
                <Navigation />
                <h1>Mes Tournois</h1>
                <p>Chargement...</p>
            </div>
        )
    }
    return (
        <div>
            <Navigation />
            <h1>Mes Tournois</h1>
            <ul>
                {tournamentsList.map(tournament => (
                    <li key={tournament.number} > {tournament.name} </li>
                ))}
            </ul>
        </div>
    );
};

export default TournamentsList;