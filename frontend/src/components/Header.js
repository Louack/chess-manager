import React, {useContext} from 'react'
import Navigation from '../components/Navigation';
import AuthContext from "../context/AuthContext";

const Header = () => {
    const { username } = useContext(AuthContext)

    if (username) {
        return (
            <header>
                <Navigation/>
            </header>
        )
    } else {
        return null
    }
}

export default Header

