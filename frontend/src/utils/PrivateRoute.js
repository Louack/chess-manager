import { Navigate } from "react-router-dom"

const PrivateRoute = ({children, ...rest}) => {
    const auth = false
    return auth ? children : <Navigate to='/login'/>;
}

export default PrivateRoute