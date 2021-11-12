import React from 'react'

const TournamentsListHead = ({tabs, setTabClassNames, toggleList}) => {
    return (
        <>
            <h1>Mes Tournois</h1>
            <div className='tournaments-types-nav'>
                {tabs.tabNames.map((tabName, index) => (
                    <div key={index} className={setTabClassNames(index)} onClick={(e) => toggleList(e, index)}>
                        {tabName}
                    </div>
                ))}
            </div>
        </>
    )
}

export default TournamentsListHead
