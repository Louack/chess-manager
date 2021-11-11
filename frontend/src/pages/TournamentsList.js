import React, { useEffect, useState} from "react";
import Navigation from '../components/Navigation';
import TournamentsListItem from "../components/TournamentsListItem";
import TournamentsListHead from "../components/TournamentsListHead";
import useAxios from '../utils/useAxios';

const TournamentsList = () => {
    const [tournamentsList, setTournamentsList] = useState([])
    const [loading, setLoading] = useState(false)
    const [initMessage, setInitMessage] = useState(
        <p>Sélectionnez une liste de tournois à afficher</p>
    )
    const [tabs, setTabs] = useState({
        activeTab: 'open-tour',
        tabNames: ['Tournois à venir', 'Tournois en cours', 'Tournois terminés']
    })

    let axios = useAxios()

    let getTournamentsList = async (index) => {
        if (initMessage) {
            setInitMessage(null)
        }
        setLoading(true)
        let filter = getFilter(index)
        let response = await axios.get(`api/tournaments/?${filter}=1`)
        setTournamentsList(response.data.results)
    }

    let getFilter = (index) => {
        setTabs({...tabs, activeTab: tabs.tabNames[index]})
        if (tabs.tabNames[index] === 'Tournois à venir') {
            return 'open'
        } else if (tabs.tabNames[index] === 'Tournois en cours') {
            return 'on_going'
        } else if (tabs.tabNames[index] === 'Tournois terminés') {
            return 'completed'
        }
    }

    let setClasses = (index) => {
        if (tabs.activeTab === tabs.tabNames[index]) {
            return 'tour-type-active'
        } else {
            return 'tour-type'
        }
    }


    useEffect(() => {
        if (loading) setLoading(false)
    }, [loading])

    if (loading) {
        return (
            <div>
                <TournamentsListHead tabs={tabs} setClasses={setClasses} getTournamentsList={getTournamentsList} />
                <p>Chargement...</p>
            </div>
        )
    }
    return (
        <div>
            <TournamentsListHead tabs={tabs} setClasses={setClasses} getTournamentsList={getTournamentsList} />
            <div>
                {initMessage}
                {tournamentsList.map(tournament => (
                    <TournamentsListItem key={tournament.number} tournament={tournament} />
                ))}
            </div>
        </div>
    );
};

export default TournamentsList;