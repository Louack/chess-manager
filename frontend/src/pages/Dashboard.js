import React, { useContext} from "react";
import Navigation from "../components/Navigation";
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
    let {logout} = useContext(AuthContext)
    return (
        <div className="dashboard">
            <Navigation />
            <h1>Tableau récapitulatif</h1>
            <button onClick={logout} value='logout'>Déconnexion</button>

        </div>
    )
}

export default Dashboard;