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
                console.log(response.data[0])
                setProfile(response.data[0])
                setLoading(false)
            })
        }
    }, [loading])

    let mainElement = 
        <div className='profile'>
            <h2>Mon Profil</h2>
            {
                loading ? 
                    <p>Chargement...</p> 
                    :
                    <>
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
                    </>
            }
        </div>

    return (
        <>
            <BasePage main={mainElement} />
        </>
    )
};

export default Profile;