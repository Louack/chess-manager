import { Navigate } from "react-router-dom";
import { useContext} from 'react';
import AuthContext from '../context/AuthContext';

const PublicRoute = ({children}) => {
    let {tokens} = useContext(AuthContext)
    return !tokens ? children : <Navigate to='/'/>;
}

export default PublicRoute