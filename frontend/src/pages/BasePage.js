import React from 'react'
import Header from '../components/Header';

const BasePage = ({main}) => {
    return (
        <>
            <Header />
            <main>
                {main}
            </main>
        </>
    )
}

export default BasePage
