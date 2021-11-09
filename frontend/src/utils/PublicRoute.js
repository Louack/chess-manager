import { Navigate } from "react-router-dom"

const PublicRoute = ({children}) => {
    const auth = false
    return !auth ? children : <Navigate to='/'/>;
}

export default PublicRoute