import React, { useRef, useEffect } from 'react';

const ModalForm = ({modalStatus, setModalStatus, title, form}) => {
    const containerRef = useRef()

    useEffect(() => {
        const checkOutsideClick = (e) => {
            if (modalStatus && containerRef.current && !containerRef.current.contains(e.target)) {
                console.log('hey')
                setModalStatus(false)
            }
          }
          document.addEventListener("mousedown", checkOutsideClick)

          return () => {
            document.removeEventListener("mousedown", checkOutsideClick)
          }
        
    }, [modalStatus, setModalStatus])

    return (
        <>
            {modalStatus && <div 
                className={'modal-background'} 
                onClick={(e) => {if (e.target.className === 'modal-background') setModalStatus(false)}}>
                <div className={'modal-container'} ref={containerRef}>
                    <button className={'modal-closing'} onClick={() => {setModalStatus(false)}}>
                        X
                    </button>
                    <div className={'modal-title'}>
                        <h3>{title}</h3>
                    </div>
                    <div className={'modal-body'}>
                        {form}
                    </div>
                </div>
            </div>}
        </>
    );
};

export default ModalForm;