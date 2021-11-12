import React, { useEffect, useState} from "react";
import TournamentsListItem from "../components/TournamentsListItem";
import TournamentsListHead from "../components/TournamentsListHead";
import BasePage from "./BasePage";
import useAxios from '../utils/useAxios';

const TournamentsList = () => {
    const [loading, setLoading] = useState(false);
    const [bottomDiv, setBottomDiv] = useState(
        <p>Sélectionnez une liste de tournois à afficher</p>
    );
    const [tabs, setTabs] = useState({
        activeTab: 'open-tour',
        tabNames: ['Tournois à venir', 'Tournois en cours', 'Tournois terminés']
    });

    let axios = useAxios();

    let getTournamentsList = async (index) => {
        setLoading(true)
        let filter = getFilter(index)
        let response = await axios.get(`api/tournaments/?${filter}=1`)
        setBottomDiv(
            response.data.results.map(tournament => (
            <TournamentsListItem key={tournament.number} tournament={tournament} />
        ))
        );
    };

    let getFilter = (index) => {
        setTabs({...tabs, activeTab: tabs.tabNames[index]})
        if (tabs.tabNames[index] === 'Tournois à venir') {
            return 'open'
        } else if (tabs.tabNames[index] === 'Tournois en cours') {
            return 'on_going'
        } else if (tabs.tabNames[index] === 'Tournois terminés') {
            return 'completed'
        };
    };

    let setTabClassNames = (index) => {
        if (tabs.activeTab === tabs.tabNames[index]) {
            return 'tour-type-active'
        } else {
            return 'tour-type'
        };
    };

    let tournamentsListHead = <
            TournamentsListHead 
            tabs={tabs} 
            setTabClassNames={setTabClassNames} 
            getTournamentsList={getTournamentsList} 
        />;

    let checkLoading = () => {
        if (loading) {
            return (
                <>
                    {tournamentsListHead}
                    <p>Chargement...</p>
                </>
            )
        } else {
            return (
                <>
                    {tournamentsListHead}
                    <div className='tournaments-list'>
                        {bottomDiv}
                    </div>
                </>
            )
        }
    }
    
    let mainDiv = checkLoading()

    useEffect(() => {
        if (loading) setLoading(false)
    }, [loading]);

    return (
       <BasePage main={mainDiv} />
    );
};

export default TournamentsList;