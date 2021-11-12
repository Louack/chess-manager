import React from 'react';

const ModalForm = ({modalStatus, setModalStatus, title, form}) => {
    return (
        <div>
            {modalStatus && <div className={'modal-background'}>
                <div className={'modal-container'}>
                    <button className={'modal-opening'} onClick={() => {setModalStatus(false)}}>
                        X
                    </button>
                    <div className={'modal-title'}>
                        <h2>{title}</h2>
                    </div>
                    <div className={'modal-body'}>
                        {form}
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default ModalForm;