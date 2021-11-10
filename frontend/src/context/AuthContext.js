import { createContext, useEffect, useState } from 'react';
import axios from "axios";

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    let checkToken = () => {
        return localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    } 
    const [authTokens, setAuthTokens] = useState(checkToken)
    const [loading, setLoading] = useState(true)

    let getAuthTokens = (resData) => {
        setAuthTokens(resData);
        localStorage.setItem('authTokens', JSON.stringify(resData))
    }

    let removeAuthTokens = () => {
        setAuthTokens(null);
        localStorage.removeItem("authTokens")
    }

    let updateAuthTokens = async () => {
        try {
            let response = await axios.post('api/token/refresh/', {"refresh": authTokens?.refresh})
            getAuthTokens(response.data)
        } catch(error) {
            if (error.response.status === 401) {
                removeAuthTokens()
            }
        }
        if (loading) {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (loading) {
            updateAuthTokens()
        }

        let interval = setInterval(() => {
            if (authTokens) {
                updateAuthTokens()
            }
        }, 240000)

        return () => clearInterval(interval)
    }, [authTokens, loading])

    let context = {
        authTokens:authTokens,
        getAuthTokens:getAuthTokens,
        removeAuthTokens:removeAuthTokens,
        updateAuthTokens:updateAuthTokens
    }

    return(
        <AuthContext.Provider value={context}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}