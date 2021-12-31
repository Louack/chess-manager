import React from 'react'
import Header from '../components/Header';

const BasePage = ({main}) => {
    return (
        <>
            <Header />
            <main>
                {main}
            </main>
            <footer>
                <p>Made by Loïc Briset</p>
            </footer>
        </>
    )
}

export default BasePage
