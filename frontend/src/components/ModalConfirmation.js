import React from 'react';

const ModalConfirmation = ({modalConfirmStatus, setModalConfirmStatus, title, question, actionToPerform}) => {
    return (
        <div>
            {modalConfirmStatus && <div className={'modal-background'}>
                <div className={'modal-container'}>
                    <button className={'modal-opening'} onClick={() => {setModalConfirmStatus(false)}}>
                        X
                    </button>
                    <div className={'modal-title'}>
                        <h2>{title}</h2>
                    </div>
                    <div className={'modal-body'}>
                        {question}
                    </div>
                    <button onClick={actionToPerform}>
                        Confirmer
                    </button>
                </div>
            </div>}
        </div>
    );
};

export default ModalConfirmation;