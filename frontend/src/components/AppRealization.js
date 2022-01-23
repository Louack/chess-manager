import React, {useState} from 'react';
import Modal from './modals/Modal';

/**
 * Description of the stacks used to realize the complete App. 
 * To be displayed inside a modal.
 */
const AppRealization = () => {
    const [modalStatus, setModalStatus] = useState(false)
    const body = 
        <div className='modal-description'>
            <p>Application réalisée par Loïc Briset et inspirée d'un projet OpenClassrooms</p>
            <h4>Backend</h4>
            <span>- Django Rest Framework</span>
            <h4>Frontend</h4>
            <span>- React JS</span>
            <h4>Base de données</h4>
            <span>- PostgreSQL</span>
            <h4>Conteneurisation</h4>
            <span>- Docker</span>
            <h4>Déploiement</h4>
            <span>- Heroku</span>
            <h4>Intégration continue / Déploiement continu</h4>
            <span>- CircleCI</span>
        </div>

    return (
        <>
            <span onClick={() => {setModalStatus(true)}}>
                Réalisation
            </span>
            < Modal
                modalStatus={modalStatus}
                setModalStatus={setModalStatus}
                title={"Réalisation de l'application"}
                body={body}
            />
        </>
    )
};

export default AppRealization;
