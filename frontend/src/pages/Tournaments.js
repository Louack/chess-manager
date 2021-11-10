import axios from "axios";
import React, { useContext, useEffect, useState} from "react";
import Navigation from '../components/Navigation';
import AuthContext from '../context/AuthContext';

const Tournaments = () => {
    const [tournamentsList, setTournamentsList] = useState([])
    const [loading, setLoading] = useState(true)
    let {authTokens, removeAuthTokens} = useContext(AuthContext)

    let getTournamentsList = async () => {
        let headers = {
            Authorization: "Bearer " + authTokens.access
        }
        try {
            let response = await axios.get('api/tournaments/', {headers})
            setTournamentsList(response.data.results)
            if (loading) {
                setLoading(false)
            }
        } catch(error) {
            if (error.response.status === 401) {
                removeAuthTokens()
            }
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
                    <li key={tournament.number} > {tournament.tournament_name} </li>
                ))}
            </ul>
        </div>
    );
};

export default Tournaments;