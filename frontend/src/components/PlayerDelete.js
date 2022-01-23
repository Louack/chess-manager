import React, {useState} from 'react';
import ModalConfirmation from "./ModalConfirmation";
import useAxios from "../utils/useAxios";
import {useNavigate} from "react-router-dom";

/**
 * Component calling a confirmation modal before player deletion.
 */
const PlayerDelete = ( {player} ) => {
    const [modalConfirmStatus, setModalConfirmStatus] = useState(false)
    const axios = useAxios()
    const navigate = useNavigate();

    const deletePlayer = async () => {
        await axios.delete(`/api/players/${player.number}/`)
        navigate(`/players/`)
    }

    return (
        <div className='tour-creation'>
            <button
                className={'modal-opening red-btn'}
                onClick={() => {
                    setModalConfirmStatus(true)
                }}
            >
                Supprimer
            </button>
            < ModalConfirmation
                actionType={"delete"}
                modalConfirmStatus={modalConfirmStatus}
                setModalConfirmStatus={setModalConfirmStatus}
                title={`Suppression du joueur #${player.number}`}
                question={'Voulez-vous vraiment supprimer ce joueur ?'}
                actionToPerform={deletePlayer}
            />
        </div>
    );
};

export default PlayerDelete;