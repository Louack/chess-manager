import { Navigate } from "react-router-dom"
import { useContext} from 'react';
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({children}) => {
    let {tokens} = useContext(AuthContext)
    return tokens ? children : <Navigate to='/login'/>;
}

export default PrivateRoute