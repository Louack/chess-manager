import React, {useState} from 'react';
import ModalForm from "./ModalForm";
import PlayerCreationForm from "./PlayerCreationForm";

const PlayerCreation = ( {setCreated} ) => {
    const [modalStatus, setModalStatus] = useState(false)
    const form = <PlayerCreationForm setCreated={setCreated}/>

    return (
        <div className='creation-btn'>
            <button
                className={'modal-opening green-btn'}
                onClick={() => {
                    setModalStatus(true)
                }}
            >
                Créer un joueur
            </button>
            < ModalForm
                modalStatus={modalStatus}
                setModalStatus={setModalStatus}
                title={"Création d'un joueur"}
                form={form}
            />
        </div>
    );
};

export default PlayerCreation;