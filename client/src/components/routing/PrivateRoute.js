import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const authToken = localStorage.getItem("authToken");
    console.log("PrivateRoute - authToken:", authToken);
    return authToken ? children : <Navigate to="/login" />;
}

export default PrivateRoute;