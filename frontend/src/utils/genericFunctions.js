export const getFormattedDate = (date) => {
    let day = date.slice(8, 10)
    let month = date.slice(5, 7)
    let year = date.slice(0, 4)
    return (day + "/" + month + "/" + year)
} 

export const getFormattedUrlApi = (url) => {
    if (url) {
        if (url.includes('backend')) {
            return url.slice(19)
        } else {
            return url.slice(21)
        }
    } else {
        return null
    }
} 