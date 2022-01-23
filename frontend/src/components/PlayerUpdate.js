import React, {useState} from 'react';
import Modal from "./Modal";
import PlayerUpdateForm from "./PlayerUpdateForm";

/**
 * Button component calling a player update modal.
 */
const PlayerUpdate = ( {player, setUpdated} ) => {
    const [modalStatus, setModalStatus] = useState(false)

    const form = <
        PlayerUpdateForm
        player={player}
        setUpdated={setUpdated}
        setModalStatus={setModalStatus}
        />

    return (
        <div className='tour-creation'>
            <button
                className={'modal-opening green-btn'}
                onClick={() => {
                    setModalStatus(true)
                }}
            >
                Modifier
            </button>
            < Modal
                modalStatus={modalStatus}
                setModalStatus={setModalStatus}
                title={`Modification du joueur n°${player.number}`}
                body={form}
            />
        </div>
    );
};

export default PlayerUpdate;