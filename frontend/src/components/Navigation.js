import React from 'react';
import  { NavLink } from "react-router-dom"

const Navigation = () => {
    return (
        <div className='navigation'>
            <NavLink exact to ="/">
                Dashboard
            </NavLink>
            <NavLink exact to ="/profile">
                Mon profil
            </NavLink>
            <NavLink exact to ="/tournaments">
                Mes tournois
            </NavLink>
            <NavLink exact to ="/players">
                Mes joueurs
            </NavLink>
        </div>
    );
};

export default Navigation;