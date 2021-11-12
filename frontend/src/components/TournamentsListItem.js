import React from 'react'

const TournamentsListItem = ({tournament}) => {
    return (
        <div className='tournament-item'>
            <p>{tournament.name}</p>
        </div>
    )
}

export default TournamentsListItem
