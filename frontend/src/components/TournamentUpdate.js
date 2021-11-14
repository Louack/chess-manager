import React from 'react'
import {useState} from "react";
import ModalForm from "./ModalForm";
import TournamentUpdateForm from "./TournamentUpdateForm";

const TournamentUpdate = ({ tournament }) => {
    const [modalStatus, setModalStatus] = useState(false)
    const form = <TournamentUpdateForm tournament = {tournament}/>
    return (
        <div className='tour-creation'>
            <button
                className={'modal-opening'}
                onClick={() => {
                    setModalStatus(true)
                }}
            >
                Modification
            </button>
            < ModalForm
                modalStatus={modalStatus}
                setModalStatus={setModalStatus}
                title={`Modification du tournoi n°${tournament.number}`}
                form={form}
            />
        </div>
    );
};

export default TournamentUpdate;