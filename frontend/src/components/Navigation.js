import React, {useContext} from 'react';
import  { NavLink } from "react-router-dom"
import '../App.css'
import AuthContext from "../context/AuthContext";


const Navigation = () => {
    const navclassname = ({ isActive }) => "nav-link" + (isActive ? "-selected" : "")
    const { removeAuthTokens } = useContext(AuthContext)

    return (
        <nav className='navigation' >
            <NavLink className={navclassname} end to ="/">
                Dashboard
            </NavLink>
            <NavLink className={navclassname} end to ="/profile">
                Mon profil
            </NavLink>
            <NavLink className={navclassname} end to ="/tournaments">
                Mes tournois
            </NavLink>
            <NavLink className={navclassname} end to ="/players">
                Mes joueurs
            </NavLink>
            <button onClick={removeAuthTokens} value='logout'>Déconnexion</button>
        </nav>
    );
};

export default Navigation;