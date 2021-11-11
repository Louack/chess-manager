import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs';

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    let checkToken = () => {
        return localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    } 

    const [authTokens, setAuthTokens] = useState(checkToken)
    const [username, setUsername] = useState(authTokens ? jwt_decode(authTokens.access).username : null)

    let getAuthTokens = (resData) => {
        let username = jwt_decode(resData.access).username
        setUsername(username)
        setAuthTokens(resData);
        localStorage.setItem('authTokens', JSON.stringify(resData))
    }

    let updateAuthTokens = async (req=false) => {
        try {
            let response = await axios.post(`/api/token/refresh/`, {refresh: authTokens.refresh});
            localStorage.setItem('authTokens', JSON.stringify(response.data))
            setAuthTokens(response.data)
        } catch(error) {
            removeAuthTokens()
        }
    }

    let removeAuthTokens = () => {
        setAuthTokens(null);
        setUsername(null)
        localStorage.removeItem("authTokens")
    }

    let context = {
        authTokens:authTokens,
        username:username,
        setAuthTokens:setAuthTokens,
        getAuthTokens:getAuthTokens,
        removeAuthTokens:removeAuthTokens,
    }

    useEffect(() => {
        if (authTokens) {
            let decodedAccess = jwt_decode(authTokens.access)
            let accessExpired = dayjs.unix(decodedAccess.exp).diff(dayjs()) < 1;
            if (accessExpired) return updateAuthTokens()
        }
    }, [])

    return(
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}