import React, {useState} from 'react';
import ModalForm from "./ModalForm";
import PlayerCreationForm from "./PlayerCreationForm";

const PlayerCreation = ( {setCreated} ) => {
    const [modalStatus, setModalStatus] = useState(false)
    const form = <PlayerCreationForm setCreated={setCreated}/>

    return (
        <div className='player-creation'>
            <button
                className={'modal-opening'}
                onClick={() => {
                    setModalStatus(true)
                }}
            >
                Création d'un joueur
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