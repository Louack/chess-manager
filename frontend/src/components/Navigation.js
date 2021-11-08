import React from 'react';
import  { NavLink } from "react-router-dom"
import '../App.css'


const Navigation = () => {
    const navclassname = ({ isActive }) => "nav-link" + (isActive ? "-selected" : "")

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
        </nav>
    );
};

export default Navigation;