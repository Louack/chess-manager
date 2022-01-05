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
        <>
            <h2>Profil</h2>
            {
                loading ? 
                    <p>Chargement...</p> 
                    :
                    <>
                        <div className='profile-info'>
                            <h3>Nom d'utilisateur :</h3> 
                            <span>{profile?.username}</span>
                        </div>
                        <div className='profile-info'>
                            <h3>Tournois créés :</h3> 
                            <span>{profile?.tournaments_created}</span>
                        </div>
                        <div className='profile-info'>
                            <h3>Joueurs créés :</h3> 
                            <span>{profile?.players_created}</span>
                        </div>
                    </>
            }
        </>

    return (
        <>
            <BasePage main={mainElement} />
        </>
    )
};

export default Profile;