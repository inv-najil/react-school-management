import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserRole, isAdmin } from "../utils/auth";

const withAuth = (WrappedComponent, allowedRole) => {
    return (props) => {
        const { user } = useAuth();
        const role = getUserRole();

        if (!user) return <Navigate to="/login" />;

        if (
            (allowedRole === "admin" && !isAdmin()) ||
            (allowedRole !== "admin" && role !== allowedRole)
        ) {
            return <Navigate to={`/${role}`} />;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
