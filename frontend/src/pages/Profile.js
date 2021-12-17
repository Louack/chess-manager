import React, { useEffect, useState } from 'react';
import BasePage from "./BasePage";
import useAxios from '../utils/useAxios';

const Profile = () => {
    const [profile, setProfile] = useState('')
    const [loading, setLoading] = useState(true)
    const axios = useAxios()

    useEffect(() => {
        if (loading) {
            axios.get(`/api/profile/`).then((response) => {
                setProfile(response.data[0])
                setLoading(false)
            })
        }
    }, [loading])

    let mainElement = 
        <div>
            <h1>Profil</h1>
            {
                loading ? 
                    <p>Chargement...</p> 
                    :
                    <div>
                        <p>Nom d'utilisateur : {profile?.username}</p>
                        <p>Tournois créés : {profile?.tournaments_created}</p>
                        <p>Joueurs créés : {profile?.players_created}</p>
                    </div>
            }
        </div>

    return (
        <div>
            <BasePage main={mainElement} />
        </div>
    )
};

export default Profile;