import React, {useState, useEffect} from 'react'
import Navigation from '../components/Navigation';

const Header = () => {
    const [navClass, setNavClass] = useState(() => {
        if (window.innerWidth > 1400) {
            return "large-nav"
        }
        if (window.innerWidth > 580) {
            return "medium-nav"
        }
        return "compact-nav"
    })

    const [titleClass, setTitleClass] = useState(() => {
        if (window.innerWidth > 940) {
            return "large-title"
        }
        return "compact-title"
    })

    useEffect(() => {
        const checkWindowWidth = () => {
            if (window.innerWidth > 1400) {
                setNavClass("large-nav")
                setTitleClass("large-title")
            } else if (window.innerWidth > 940){
                setNavClass("medium-nav")
                setTitleClass("large-title")
            }
            else if (window.innerWidth > 580){
                setNavClass("medium-nav")
                setTitleClass("compact-title")
            } else {
                setNavClass("compact-nav")
                setTitleClass("compact-title")
            }
        }

        window.addEventListener("resize", checkWindowWidth)

        return () => {
            window.removeEventListener("resize", checkWindowWidth)
        }
          
    }, [])

    return (
            <header>
                <div className={titleClass}>
                    <img src="/img/header-chess.jpg" alt="header-chess" />
                    <h1>Chess Manager</h1>
                </div>
                <Navigation navClass={navClass}/>
            </header>
        )
}

export default Header

