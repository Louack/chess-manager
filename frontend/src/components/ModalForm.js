import React from 'react';

const ModalForm = ({modalStatus, setModalStatus, title, form}) => {
    return (
        <>
            {modalStatus && <div 
                className={'modal-background'} 
                onClick={(e) => {if (e.target.className === 'modal-background') setModalStatus(false)}}>
                <div className={'modal-container'}>
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