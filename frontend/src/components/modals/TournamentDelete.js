import React, {useState} from 'react';
import ModalConfirmation from "./ModalConfirmation";
import useAxios from "../../utils/useAxios";
import {useNavigate} from "react-router-dom";

/**
 * Component calling a confirmation modal before tournament deletion.
 */
const TournamentDelete = ({tournament} ) => {
    const [modalConfirmStatus, setModalConfirmStatus] = useState(false)
    const axios = useAxios()
    const navigate = useNavigate();

    const deleteTournament = async () => {
        await axios.delete(`/api/tournaments/${tournament.number}/`)
        navigate(`/tournaments/`)
    }

    return (
        <div className='tournament-delete'>
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
                title={`Suppression du tournoi #${tournament.number}`}
                question={'Voulez-vous vraiment supprimer ce tournoi ?'}
                actionToPerform={deleteTournament}
            />
        </div>
    );
};

export default TournamentDelete;