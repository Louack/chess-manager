import { createContext, useState } from 'react';

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    let checkToken = () => {
        return localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    } 
    const [authTokens, setAuthTokens] = useState(checkToken)

    let getAuthTokens = (resData) => {
        setAuthTokens(resData);
        localStorage.setItem('authTokens', JSON.stringify(resData))
    }

    let logout = () => {
        setAuthTokens(null);
        localStorage.removeItem("authTokens")
    }

    let context = {
        tokens:authTokens,
        getAuthTokens:getAuthTokens,
        logout:logout
    }

    return(
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}