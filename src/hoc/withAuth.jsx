import { Navigate } from "react-router-dom";
import { getUserRole, isAdmin } from "../utils/auth";
import { useSelector } from "react-redux";

const withAuth = (WrappedComponent, allowedRole) => {
    return (props) => {
        const { user } = useSelector((state)=>state.auth);
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
