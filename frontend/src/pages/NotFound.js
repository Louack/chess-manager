import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div>
            Cette page n'existe pas
            <Link className={'nav-link'} end to ="/">
                Back to Dashboard
            </Link>
        </div>
    );
};

export default NotFound;