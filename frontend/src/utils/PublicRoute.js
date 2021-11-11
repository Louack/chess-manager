import { Navigate } from "react-router-dom";
import { useContext} from 'react';
import AuthContext from '../context/AuthContext';

const PublicRoute = ({children}) => {
    let {username} = useContext(AuthContext)
    return !username ? children : <Navigate to='/'/>;
}

export default PublicRoute