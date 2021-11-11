import React from 'react'
import Navigation from '../components/Navigation';

const TournamentsListHead = ({tabs, setClasses, getTournamentsList}) => {
    return (
        <div>
            <Navigation />
            <h1>Mes Tournois</h1>
            <div className='tournaments-types-nav'>
                {tabs.tabNames.map((tabName, index) => (
                    <div key={index} className={setClasses(index)} onClick={() => getTournamentsList(index)}>
                        {tabName}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TournamentsListHead
