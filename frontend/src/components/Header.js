import React, {useContext} from 'react'
import Navigation from '../components/Navigation';
import AuthContext from "../context/AuthContext";

const Header = () => {
    const { username } = useContext(AuthContext)

    return (
            <header style={username ? 
                {justifyContent: "space-between", borderBottom: "solid"} : 
                {justifyContent: "center"}}>
                <h1>Chess Manager</h1>
                {username && <Navigation/>}
            </header>
        )
}

export default Header

