import { Navigate } from "react-router-dom";
import { useContext} from 'react';
import AuthContext from '../context/AuthContext';

const PublicRoute = ({children}) => {
    let {authTokens} = useContext(AuthContext)
    return !authTokens ? children : <Navigate to='/'/>;
}

export default PublicRoute