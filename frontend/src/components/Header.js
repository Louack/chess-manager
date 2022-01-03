import React, {useContext} from 'react'
import Navigation from '../components/Navigation';
import AuthContext from "../context/AuthContext";

const Header = () => {
    const { username } = useContext(AuthContext)

    return (
            <header>
                <div className='header-logo-title'>
                    <img src="/img/header-chess.jpg" alt="header-chess" />
                    <h1>Chess Manager</h1>
                </div>
                {username && <Navigation/>}
            </header>
        )
}

export default Header

