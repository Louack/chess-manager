import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";


const Navigation = ( {navClass, openUserMenu, setOpenUserMenu} ) => {
    const { removeAuthTokens } = useContext(AuthContext)
    const navRef = useRef()
    const navigate = useNavigate();

    const displayUserMenu = () => {
        setOpenUserMenu(!openUserMenu)
        console.log(openUserMenu)
    }

    useEffect(() => {
        const checkOutsideClick = (e) => {
            if (openUserMenu && navRef.current && !navRef.current.contains(e.target)) {
                console.log('hey')
                setOpenUserMenu(false)
            }
          }
          document.addEventListener("mousedown", checkOutsideClick)

          return () => {
            document.removeEventListener("mousedown", checkOutsideClick)
          }
          
    }, [openUserMenu, setOpenUserMenu])

    return (
        <>
            <nav className={navClass} ref={navRef}>
                <div className="menu-switch" onClick={() => displayUserMenu()}>
                    <span className="nav-text">
                        <b>Menu</b>
                    </span>
                    <img src="/img/arrow-icon.png" alt="arrow-icon" style={openUserMenu ? {transform: 'rotate(-90deg)'} : null}/>
                </div>
                <div className="nav-menu" style={openUserMenu ? {display: 'flex'} : null}>
                    <div className="menu-item" onClick={() => navigate("/tournaments")}>
                        <img src="/img/cup-icon.png" alt="cup-icon" />
                        <span className="nav-text">
                            <b>Mes tournois</b>
                        </span>
                    </div>
                    <div className="menu-item" onClick={() => navigate("/players")}>
                        <img src="/img/people-icon.png" alt="people-icon" />
                        <span className="nav-text">
                            <b>Mes joueurs</b>
                        </span>
                    </div>
                    <div className="menu-item" onClick={() => navigate("/profile")}>
                        <img src="/img/profile-icon.png" alt="profile-icon" />
                        <span className="nav-text">
                            <b>Mon profil</b>
                        </span>
                    </div>
                    <div className="menu-item"  onClick={removeAuthTokens}>
                        <img src="/img/unplug-icon.png" alt="unplug-icon" />
                        <span className="nav-text">
                            <b>Déconnexion</b>
                        </span>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navigation;