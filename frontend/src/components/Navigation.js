import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css'
import AuthContext from "../context/AuthContext";


const Navigation = () => {
    const { username, removeAuthTokens } = useContext(AuthContext)
    const [openUserMenu, setOpenUserMenu] = useState(false)
    const menuRef = useRef()
    const navigate = useNavigate();

    const displayUserMenu = () => {
        setOpenUserMenu(!openUserMenu)
    }

    useEffect(() => {
        const checkOutsideClick = (e) => {
            if (openUserMenu && menuRef.current && !menuRef.current.contains(e.target)) {
                console.log(e.target)
                setOpenUserMenu(false)
            }
          }
          document.addEventListener("mousedown", checkOutsideClick)

          return () => {
            document.removeEventListener("mousedown", checkOutsideClick)
          }
          
    }, [openUserMenu])

    return (
        <>
            <nav ref={menuRef}>
                <div className="nav-item" onClick={() => navigate("/tournaments")}>
                    <img src="/img/cup-icon.png" alt="cup-icon" />
                    <span>
                        <b>Mes tournois</b>
                    </span>
                </div>
                <div className="nav-item" onClick={() => navigate("/players")}>
                    <img src="/img/people-icon.png" alt="people-icon" />
                    <span>
                        <b>Mes joueurs</b>
                    </span>
                </div>
                <div className="nav-item" onClick={displayUserMenu}>
                    <img className="user-menu-img" src="/img/arrow-icon.png" alt="arrow-icon" />
                    <span>
                        <b>{username}</b>
                    </span>
                </div>
                {openUserMenu && 
                <div className='nav-user-menu'>
                    <span onClick={() => navigate("/profile")}>
                        Mon profil
                    </span>
                    <span onClick={removeAuthTokens}>
                        Déconnexion
                    </span>
                </div>}
            </nav>
        </>
    );
};

export default Navigation;