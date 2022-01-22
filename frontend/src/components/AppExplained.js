import React, {useState} from 'react';
import Modal from './Modal';

const AppExplained = () => {
    const [modalStatus, setModalStatus] = useState(false)
    const body = 
        <div className='modal-description'>
            <p>Cette application, inspirée du système de jeu suisse, a pour but de créer et gérer des tournois d'échecs de 4 rondes pour 8 joueurs.</p>
            <h4>Première utilisation : étapes à suivre</h4>
            <ul>
                <li>Créer 8 joueurs.</li>
                <li>Créer un tournoi et y ajouter 8 joueurs.</li>
                <li>Vérouiller le tournoi afin de créer la première ronde et les matchs associés. Les attributs du tournoi ne sont plus modifiables après verrouillage.</li>
                <li>La page de la première ronde est accessible sur la page du tournoi, sur laquelle sont accessibles les pages des matchs associés.</li>
                <li>Sur la page d'un match, cliquer sur l'encart d'un des 2 joueurs pour désigner un gagnant ou bien cliquer sur l'encart "Egalité" en cas de match nul.</li>
                <li>Cliquer sur le bouton "valider" afin de vérouiller le match. L'issue d'un match n'est plus modifiable après verrouilage.</li>
                <li>Une fois les 4 matchs vérouillés, la ronde suivante est automatiquement créé.</li>
                <li>Compléter les matchs des rondes suivantes, jusqu'à complétition du tournoi.</li>
                <li>Le classement des joueurs est disponible à tout moment sur la page du tournoi.</li>
            </ul>
            <h4>Système de jeu</h4>
            <p>Les joueurs sont appariés selon deux algorithmes :</p>
            <ul>
                <li>Lors de la première ronde, les joueurs sont triés selon leur rang. La liste des joueurs est ensuite coupée en 2 et le 1er joueur de la 1ère liste est associé au 1er joueur de la 2nde liste, etc...</li>
                <li>Lors des rondes suivantes, les joueurs sont triés selon leur nombre de points, puis selon leur rang en cas d'égalité. Le 1er joueur de la liste est ensuite associé au 2nd joueur. Si les 2 joueurs se sont déjà affrontés, le 1er joueur est associé au 3e, etc...</li>
            </ul>
            <p>A la fin d'un tournoi, le nouveau rang de chaque joueur est calculé en fonction de la place moyenne de tous les tournois ou encore du nombre de tournois gagnés.</p>
        </div>

    return (
        <>
        <span onClick={() => {
                    setModalStatus(true)
                }}
        >
            Mode d'emploi
        </span>
        < Modal
                    modalStatus={modalStatus}
                    setModalStatus={setModalStatus}
                    title={"Mode d'emploi de l'application"}
                    body={body}
                />
        </>
    )
};

export default AppExplained;
