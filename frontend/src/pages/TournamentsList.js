import React, { useEffect, useState } from "react";
import TournamentsListItem from "../components/TournamentsListItem";
import TournamentsListHead from "../components/TournamentsListHead";
import TournamentCreation from "../components/TournamentCreation";
import BasePage from "./BasePage";
import useAxios from '../utils/useAxios';

const TournamentsList = () => {
    let creationDiv = <TournamentCreation />

    const [loading, setLoading] = useState(false);
    const [index, setIndex] = useState(false);
    const [bottomDiv, setBottomDiv] = useState(creationDiv);
    const [tabs, setTabs] = useState({
        activeTab: null,
        tabNames: ['Tournois à venir', 'Tournois en cours', 'Tournois terminés']
    });

    useEffect(() => {
        if (loading) getTournamentsList(index)
    }, [loading]);

    let toggleList = (e, index) => {
        if (e.target.className === 'tour-type') {
            setIndex(index)
            setLoading(true);
        } else {
            setTabs({...tabs, activeTab: null});
            setBottomDiv(creationDiv);
        }
    }

    let setTabClassNames = (index) => {
        if (tabs.activeTab === tabs.tabNames[index]) {
            return 'tour-type-active';
        } else {
            return 'tour-type';
        }
    };

    let getFilter = (index) => {
        setTabs({...tabs, activeTab: tabs.tabNames[index]})
        if (tabs.tabNames[index] === 'Tournois à venir') {
            return 'open';
        } else if (tabs.tabNames[index] === 'Tournois en cours') {
            return 'on_going';
        } else if (tabs.tabNames[index] === 'Tournois terminés') {
            return 'completed';
        }
    };

    let axios = useAxios();

    let getTournamentsList = async (index) => {
        let filter = getFilter(index);
        let response = await axios.get(`api/tournaments/?${filter}=1`);
        let tourList = response.data.results.map(tournament => (
            <TournamentsListItem key={tournament.number} tournament={tournament}/>
        ))
        setBottomDiv(
            <div className='tournaments-list'>
                {tourList}
            </div>
        );
        setLoading(false)
    };

    let tournamentsListHead = <TournamentsListHead tabs={tabs} setTabClassNames={setTabClassNames} toggleList={toggleList} />;

    let getMainElement = () => {
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
                    {bottomDiv}
                </>
            );
        }
    };
    
    let mainElement = getMainElement();

    return (
       <BasePage main={mainElement} />
    );
};

export default TournamentsList;