import React, { useContext} from "react";
import Navigation from "../components/Navigation";
import AuthContext from '../context/AuthContext';

const Dashboard = () => {
    let { username } = useContext(AuthContext)
    return (
        <div className="dashboard">
            <Navigation />
            <h1>Tableau récapitulatif</h1>
            <p>Bonjour {username}</p>
        </div>
    )
}

export default Dashboard;