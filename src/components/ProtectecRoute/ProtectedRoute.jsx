import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();

    // if (authCtx.isLoggedIn) {
    //     return children;
    //   }
    return children

    //   return <Navigate to="/login" state={{ from: location }} />;
};

export default ProtectedRoute;