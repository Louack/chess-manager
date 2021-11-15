import React from 'react';
import { Link } from 'react-router-dom';
import BasePage from "./BasePage";

const NotFound = () => {
    const getMainElement = () => {
        return (
            <div>
            Cette page n'existe pas
            <Link className={'nav-link'} end to ="/">
                Back to Dashboard
            </Link>
        </div>
        )
    }

    let mainElement = getMainElement()

    return (
        <div>
            <BasePage main={mainElement} />
        </div>
    )
};

export default NotFound;