import React, {useState} from 'react';
import ModalForm from "./ModalForm";
import PlayerUpdateForm from "./PlayerUpdateForm";

const PlayerUpdate = ( {player, setUpdated} ) => {
    const [modalStatus, setModalStatus] = useState(false)

    const form = <
        PlayerUpdateForm
        player={player}
        setUpdated={setUpdated}
        setModalStatus={setModalStatus}
        />

    return (
        <div className='creation-btn'>
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
                title={`Modification du joueur n°${player.number}`}
                form={form}
            />
        </div>
    );
};

export default PlayerUpdate;