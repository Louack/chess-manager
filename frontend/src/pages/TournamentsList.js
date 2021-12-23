import React, { useEffect, useState } from "react";
import TournamentsListItem from "../components/TournamentsListItem";
import TournamentsListHead from "../components/TournamentsListHead";
import TournamentCreation from "../components/TournamentCreation";
import Pagination from '../components/Pagination';
import BasePage from "./BasePage";
import useAxios from '../utils/useAxios';

const TournamentsList = () => {
    let creationDiv = <TournamentCreation />

    const [loading, setLoading] = useState(false);
    const [bottomDiv, setBottomDiv] = useState(creationDiv);
    const [tabs, setTabs] = useState({
        activeTab: null,
        tabNames: ['Tournois à venir', 'Tournois en cours', 'Tournois terminés']
    });
    const [apiURL, setApiURL] = useState('')

    useEffect(() => {
        if (loading) getTournamentsList(apiURL)
    }, [loading]);

    let toggleList = (e, index) => {
        if (e.target.className === 'tour-type') {
            let filter = getFilter(index);
            setApiURL(`/api/tournaments/?${filter}=1`)
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

    let getTournamentsList = async (apiURL) => {
        let response = await axios.get(apiURL);
        let tourList = response.data.results.map(tournament => (
            <TournamentsListItem key={tournament.number} tournament={tournament}/>
        ))
        setBottomDiv(
            <div className='tournaments-list'>
                {tourList}
                <Pagination 
                    apiURL={apiURL}
                    setApiURL={setApiURL}
                    apiPrevious={response.data.previous}
                    apiNext={response.data.next}
                    objectsCount={response.data.count}
                    setLoading={setLoading}
                />
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