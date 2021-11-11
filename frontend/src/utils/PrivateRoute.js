import { Navigate } from "react-router-dom"
import { useContext} from 'react';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({children}) => {
    let {username} = useContext(AuthContext)
    return username ? children : <Navigate to='/login'/>;
}

export default PrivateRoute