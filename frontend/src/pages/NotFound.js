import React from 'react';

const NotFound = () => {
    return (
        <div className='main-container'>
            <div className='not-found'>
                <h4>Echec et mat, cette page n'existe pas !</h4>
                <img src='/img/not-found.png' alt='not-found'/>
            </div>
        </div>
    )
};

export default NotFound;