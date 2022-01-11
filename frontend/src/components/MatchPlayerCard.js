import React from 'react'

const MatchPlayerCard = ( {player} ) => {
    return (
        <div className='match-player-card'> 
            <h4>{player.username} (#{player.number})</h4>
            <span>{player.first_name} {player.last_name}</span>
            <span>Rang {player.rank}</span>
        </div>
    )
}

export default MatchPlayerCard
