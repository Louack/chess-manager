import React from 'react'
import BasePage from "./BasePage";

const MatchesList = () => {
    const getMainElement = () => {
        return null
    }

    let mainElement = getMainElement()

    return (
        <div>
            <BasePage main={mainElement} />
        </div>
    )
}

export default MatchesList
