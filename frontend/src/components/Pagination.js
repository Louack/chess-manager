import React, { useEffect, useState } from 'react';

const Pagination = ({ apiURL, setApiURL, apiNext, apiPrevious, objectsCount, setLoading }) => {
    const [currentPage, setCurrentPage] = useState('');
    const [totalPages, setTotalPages] = useState('');

    const handlePrevious = () => {
        setApiURL(apiPrevious)
        setLoading(true)
    }

    const handleNext = () => {
        setApiURL(apiNext)
        setLoading(true)
    }

    useEffect(() => {
        setTotalPages(Math.ceil(objectsCount / 25))

        if (apiURL.includes('page') === true) {
            const splittedURL = apiURL.split('')
            let page = ''
            let poppedNum = splittedURL.pop()
            while (!isNaN(poppedNum) ) {
                page = poppedNum + page
                poppedNum = splittedURL.pop()
            }
            setCurrentPage(page)
        } else {
            setCurrentPage('1')
        }
    }, []);

    return (
        <div className='pagination'>
            {apiPrevious && 
            <button onClick={handlePrevious}>
                Précédent
            </button>
            }
            <span>Page {currentPage} sur {totalPages}</span>
            {apiNext && 
            <button onClick={handleNext}>
                Suivant
            </button>
            }
        </div>
    )
}

export default Pagination
