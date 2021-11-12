import React, {useState} from 'react';

const TournamentCreationForm = () => {
    const [name, setName] = useState('')
    const [date, setDate] = useState('')

    return (
        <form >
            <input
                type='text'
                onChange={(e) => setName(e.target.value)}
                placeholder='Nom du tournoi'
                value={name}
            />
            <input
                type='text'
                onChange={(e) => setDate(e.target.value)}
                placeholder='Date du tournoi'
                value={date}
            />
            <input
                type='text'
                onChange={(e) => setDate(e.target.value)}
                placeholder='Date du tournoi'
                value={date}
            />
            <input type='submit' value="Créer"/>
        </form>
    );
};

export default TournamentCreationForm;