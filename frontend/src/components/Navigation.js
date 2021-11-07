import React from 'react';
import  { NavLink } from "react-router-dom"
import '../App.css'

const navclassname = ({ isActive }) => "nav-link" + (isActive ? "-selected" : "")

const Navigation = () => {
    return (
        <div className='navigation' >
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
        </div>
    );
};

export default Navigation;