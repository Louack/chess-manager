import { createContext, useState } from 'react';

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
    const [authTokens, setauthTokens] = useState('')

    let getAuthTokens = (resData) => {
        setauthTokens(resData);
        localStorage.setItem('authTokens', JSON.stringify(resData))
    }

    let context = {
        tokens:authTokens,
        getAuthTokens:getAuthTokens
    }

    return(
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}