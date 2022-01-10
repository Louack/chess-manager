const getFormattedDate = (date) => {
    let day = date.slice(8, 10)
    let month = date.slice(5, 7)
    let year = date.slice(0, 4)
    return (day + "/" + month + "/" + year)
} 

export default getFormattedDate
