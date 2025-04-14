import { Navigate, useLocation  } from "react-router-dom";
import { useUser } from "./UserContext";

const PrivateRoute = ({ element }) => {
    const { user, loading } = useUser();
    const location = useLocation();

    if (loading) {
        return <h2>Loading...</h2>;
    }
    if(user && user.status === "Registered" && location.pathname !== "/onboard"){
        return <Navigate to="/onboard" replace />;
    }
    return user ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
