import React, { useEffect, useState } from 'react';
import BasePage from "./BasePage";
import useAxios from '../utils/useAxios';
import Spinner from '../components/Spinner';

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

    let profileDiv = (
                        <div className='main-container'>
                            <h2>Mon Profil</h2>
                            <div className='profile-section'>
                                <h3>Informations générales</h3>
                                <div className='profile-info'>
                                    <h4>Nom d'utilisateur</h4> 
                                    <span>{profile?.username}</span>
                                </div>
                            </div>
                            <div className='profile-section'>
                                <h3>Statistiques</h3>
                                <div className='profile-info'>
                                    <h4>Nombre de tournois créés</h4> 
                                    <span>{profile?.tournaments_created}</span>
                                </div>
                                <div className='profile-info'>
                                    <h4>Nombre de joueurs créés</h4> 
                                    <span>{profile?.players_created}</span>
                                </div>
                            </div>
                        </div>
                    )

    let mainElement = 
        <>
            { loading ? <Spinner /> : profileDiv }
        </>

    return (
        <>
            <BasePage main={mainElement} />
        </>
    )
};

export default Profile;