import React, {useEffect} from 'react'
import {useState} from "react";
import ModalForm from "./ModalForm";
import TournamentCreationForm from "./TournamentCreationForm";
import useAxios from "../utils/useAxios";
import { getFormattedUrlApi } from '../utils/genericFunctions';

const TournamentCreation = () => {
    const [modalStatus, setModalStatus] = useState(false)
    const [playersOptions, setPlayersOptions] = useState([])
    const [nextPage, setNextPage] = useState('')
    const [readyForRender, setReadyForRender] = useState(false)
    const form = <TournamentCreationForm playersOptions={playersOptions} />

    const axios = useAxios()


    async function getPlayersList (url) {
        try {
            const tempList = playersOptions
            const response = await axios.get(url)
            response.data.results.map(player => {
                return tempList.push({
                    value: player.number,
                    label: player.username
                })
            })
            setPlayersOptions(tempList)

            if (response.data.next != null) {
                setNextPage(getFormattedUrlApi(response.data.next))
            } else {
                setNextPage('')
                setReadyForRender(true)
            }

        } catch(error) {
            console.log(error)
        }
    }

    useEffect( () => {
        const url = '/api/players/'
        getPlayersList(url)
    }, [])

    useEffect(() => {
        if (nextPage) getPlayersList(nextPage)
    }, [nextPage])

    return (
        <div className='creation-btn'>
            <button
                className={'modal-opening green-btn'}
                onClick={() => {
                    setModalStatus(true)
                }}
            >
                Créer un tournoi
            </button>
            {readyForRender && < ModalForm
                modalStatus={modalStatus}
                setModalStatus={setModalStatus}
                title={"Création d'un tournoi"}
                form={form}
            />}
        </div>
    );
}

export default TournamentCreation
