import React from 'react'
import {useState} from "react";
import ModalForm from "./ModalForm";
import TournamentCreationForm from "./TournamentCreationForm";

const TournamentCreation = () => {
    const [modalStatus, setModalStatus] = useState(false)
    const form = <TournamentCreationForm />
    return (
        <div className='tour-creation'>
            <p>Sélectionnez une liste de tournois à afficher ou créez un nouveau tournoi.</p>
            <button
                className={'modal-opening'}
                onClick={() => {
                    setModalStatus(true)
                }}
            >
                Création
            </button>
            < ModalForm
                modalStatus={modalStatus}
                setModalStatus={setModalStatus}
                title={"Création d'un tournoi"}
                form={form}
            />
        </div>
    );
}

export default TournamentCreation
