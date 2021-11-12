import React, { useEffect, useState} from "react";
import TournamentsListItem from "../components/TournamentsListItem";
import TournamentsListHead from "../components/TournamentsListHead";
import BasePage from "./BasePage";
import useAxios from '../utils/useAxios';

const TournamentsList = () => {
    let instructionMessage = <p>Sélectionnez une liste de tournois à afficher</p>

    const [loading, setLoading] = useState(false);
    const [bottomDiv, setBottomDiv] = useState(instructionMessage);
    const [tabs, setTabs] = useState({
        activeTab: null,
        tabNames: ['Tournois à venir', 'Tournois en cours', 'Tournois terminés']
    });

    useEffect(() => {
        if (loading) setLoading(false)
    }, [loading]);

    let toggleList = (e, index) => {
        if (e.target.className === 'tour-type') {
            getTournamentsList(index);
        } else {
            setTabs({...tabs, activeTab: null});
            setBottomDiv(instructionMessage);
        }
    }

    let setTabClassNames = (index) => {
        if (tabs.activeTab === tabs.tabNames[index]) {
            return 'tour-type-active';
        } else {
            return 'tour-type';
        };
    };

    let getFilter = (index) => {
        setTabs({...tabs, activeTab: tabs.tabNames[index]})
        if (tabs.tabNames[index] === 'Tournois à venir') {
            return 'open';
        } else if (tabs.tabNames[index] === 'Tournois en cours') {
            return 'on_going';
        } else if (tabs.tabNames[index] === 'Tournois terminés') {
            return 'completed';
        };
    };

    let axios = useAxios();

    let getTournamentsList = async (index) => {
        setLoading(true);
        let filter = getFilter(index);
        let response = await axios.get(`api/tournaments/?${filter}=1`);
        setBottomDiv(
            response.data.results.map(tournament => (
            <TournamentsListItem key={tournament.number} tournament={tournament} />
        ))
        );
    };

    let tournamentsListHead = <TournamentsListHead tabs={tabs} setTabClassNames={setTabClassNames} toggleList={toggleList} />;

    let getMainDiv = () => {
        if (loading) {
            return (
                <>
                    {tournamentsListHead}
                    <p>Chargement...</p>
                </>
            );
        } else {
            return (
                <>
                    {tournamentsListHead}
                    <div className='tournaments-list'>
                        {bottomDiv}
                    </div>
                </>
            );
        };
    };
    
    let mainDiv = getMainDiv();

    return (
       <BasePage main={mainDiv} />
    );
};

export default TournamentsList;