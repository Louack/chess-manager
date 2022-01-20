export const getFormattedDate = (date) => {
    let day = date.slice(8, 10)
    let month = date.slice(5, 7)
    let year = date.slice(0, 4)
    return (day + "/" + month + "/" + year)
} 

export const getFormattedUrlApi = (url) => {
    if (process.env.REACT_APP_PROXY_HOST) {
        if (url) {
            return url.slice(process.env.REACT_APP_PROXY_HOST.length)
        } else {
            return null
        }
    } else {
        return url
    }
} 