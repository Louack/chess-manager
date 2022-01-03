import React, { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css'
import AuthContext from "../context/AuthContext";


const Navigation = () => {
    const { username, removeAuthTokens } = useContext(AuthContext)
    const [openUserMenu, setOpenUserMenu] = useState(false)
    const navRef = useRef()
    const navigate = useNavigate();

    const displayUserMenu = () => {
        setOpenUserMenu(!openUserMenu)
    }

    useEffect(() => {
        const checkOutsideClick = (e) => {
            if (openUserMenu && navRef.current && !navRef.current.contains(e.target)) {
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
            <nav ref={navRef}>
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
                    <img className="user-menu-img" src="/img/arrow-icon.png" alt="arrow-icon" style={openUserMenu ? {transform: 'rotate(90deg)'} : null}/>
                    <span>
                        <b>{username}</b>
                    </span>
                </div>
                {openUserMenu && 
                <div className='nav-user-menu'>
                    <div className='user-menu-item' onClick={() => navigate("/profile")}>
                        <img src="/img/profile-icon.png" alt="profile-icon" />
                        <span>
                            Mon profil
                        </span>
                    </div>
                    <div className='user-menu-item'  onClick={removeAuthTokens}>
                        <img src="/img/unplug-icon.png" alt="unplug-icon" />
                        <span>
                            Déconnexion
                        </span>
                    </div>
                </div>}
            </nav>
        </>
    );
};

export default Navigation;