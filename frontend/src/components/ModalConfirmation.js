import React, { useState, useEffect } from 'react';

const ModalConfirmation = ({actionType, modalConfirmStatus, setModalConfirmStatus, title, question, actionToPerform}) => {
    const [btnName, setBtnName] = useState('')
    const [btnClass, setBtnClass] = useState('')

    useEffect(() => {
        if (actionType === 'delete') {
            setBtnName('Supprimer')
            setBtnClass('delete-btn')
        }
    }, [])
    return (
        <div>
            {modalConfirmStatus && <div className={'modal-background'}>
                <div className={'modal-container'}>
                    <button className={'modal-closing'} onClick={() => {setModalConfirmStatus(false)}}>
                        X
                    </button>
                    <div className={'modal-title'}>
                        <h2>{title}</h2>
                    </div>
                    <div className={'modal-body'}>
                        {question}
                    </div>
                    <button 
                        className={btnClass}
                        onClick={actionToPerform}>
                        {btnName}
                    </button>
                </div>
            </div>}
        </div>
    );
};

export default ModalConfirmation;