import React, { useState, useEffect, useRef } from 'react';

/**
 * Modal component able to display different kind of confirmation messages.
 */
const ModalConfirmation = ({actionType, modalConfirmStatus, setModalConfirmStatus, title, question, actionToPerform}) => {
    const [btnName, setBtnName] = useState('')
    const [btnClass, setBtnClass] = useState('')
    const containerRef = useRef()

    useEffect(() => {
        if (actionType === 'delete') {
            setBtnName('Supprimer')
            setBtnClass('red-btn')
        }
    }, [])

    useEffect(() => {
        const checkOutsideClick = (e) => {
            if (modalConfirmStatus && containerRef.current && !containerRef.current.contains(e.target)) {
                console.log('hey')
                setModalConfirmStatus(false)
            }
          }
          document.addEventListener("mousedown", checkOutsideClick)

          return () => {
            document.removeEventListener("mousedown", checkOutsideClick)
          }
        
    }, [modalConfirmStatus, setModalConfirmStatus])


    return (
        <>
            {modalConfirmStatus && <div className={'modal-background'}>
                <div className={'modal-container'} ref={containerRef}>
                    <img src="/img/closing-cross.png" alt="closing-cross" onClick={() => {setModalConfirmStatus(false)}}/>
                    <div className={'modal-title'}>
                        <h3>{title}</h3>
                    </div>
                    <div className={'modal-body'}>
                        <span>{question}</span>
                    </div>
                    <button 
                        className={btnClass}
                        onClick={actionToPerform}>
                        {btnName}
                    </button>
                </div>
            </div>}
        </>
    );
};

export default ModalConfirmation;